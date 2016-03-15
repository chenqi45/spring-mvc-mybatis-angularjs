/**
 * Created by crell on 2016/1/17.
 */
app.factory('LoginService',['$q','$http',function($q,$http){
    var loginInfo = {hasLogin:false};
    return {
        login:function(form){
            var deferred = $q.defer();
            $http.post('/ajax/login', form).success(function (obj) {
                if(obj.status==Status.SUCCESS) {
                    $.cookie('userName',obj.data.userName,{expires: 7});
                    $.cookie('nickName',obj.data.nickName,{expires: 7});
                    if(form.isRemember){
                        $.cookie('token',obj.data.token,{expires: 7});
                    }
                    loginInfo.info = obj.data.nickName;
                    loginInfo.hasLogin = true;
                    loginInfo.loginerror = false;
                }else{
                    loginInfo.hasLogin = false;
                    loginInfo.loginerror = true;
                    loginInfo.loginerroinfo = obj.msg;
                }
                deferred.resolve(loginInfo);
            });
            return deferred.promise;
        },
        logOff : function(){
            $http.post('/ajax/logoff').success(function(obj){
                if(obj.status==Status.SUCCESS){
                    $.cookie('token', '', { expires: -1 });
                    $.cookie('nickName', '', { expires: -1 });
                    location.href = '/my'
                }
            });
        },
        getLoginInfo:function(){
            if($.cookie('nickName') != null){
                loginInfo.info = $.cookie('nickName');
                loginInfo.hasLogin = true;
                loginInfo.loginerror = false;
            }else{
                location.href = '/login';
            }
            return loginInfo;
        },
        autoLogin : function(){
            //自动登陆验证
            var deferred = $q.defer();
            $http.post('/ajax/autoLogin').success(function(obj){
                if(obj.status==Status.SUCCESS){
                    loginInfo.hasLogin = true;
                    loginInfo.info = obj.data.nickName;
                } else{
                    loginInfo.hasLogin = false;
                    loginInfo.info = '';
                    $.cookie('token','',{expires: -1});
                }
                deferred.resolve(loginInfo);
            });
            return deferred.promise;
        }
    }
}])
.factory("RegisterService",['$q','$http','BaseService',function($q,$http,BaseService){
    return{
        register : function(condition){
            return BaseService.post('/ajax/user',condition);
        },
        modifyUser : function(condition){
            return BaseService.put('/ajax/user',condition);
        },
        deleteUser : function(condition){
            return BaseService.delete('/ajax/user',condition);
        },
        remoteValid : function(userName){
            var deferred = $q.defer();
            $http.post('/ajax/user/validUserName',{'userName':userName}).success(function(data){
                deferred.resolve(data);
            });
            return deferred.promise;
        }
    }
}])
.factory("BusinessService",['BaseService',function(BaseService){
    return{
        getBusinessList : function(condition,page){
            return BaseService.get('/ajax/business',condition,page);
        }
    }
}])
.factory("UserService",['BaseService',function(BaseService){
    return{
        userValid : function(userName){
            return BaseService.post('/ajax/user/validUserName',{'userName':userName});
        }
    }
}]);