import { HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';

export class AuthInterceptorService implements HttpInterceptor{
    intercept(req: HttpRequest<any>, next: HttpHandler){
        console.log('Request is on the way');
        console.log(req.url);
        //request objects immutable e nisa wena value set karanna be 
        //req.url = 'a new url';//meheama danna be
        const modifiedRequest = req.clone({headers: req.headers.append('Auth','xyz')});
        //headers walata dala tyna eka append wela thama yanne 'modifiedRequest' variable eka
        //const modifiedRequest = req.clone({url: 'some new url',params:  ,headers: req.headers.append('print','gagana')});
        //clone eka athule apata override karanna pluwn 
        //onama core deyak me object eke

        //return next.handle(req);//Aapp eka yawana onama request ekakata me method eka run wenawa
        //e nisa wena wenama headers dada inna ona ne podu ewa serama mekata danna pluwan

        return next.handle(modifiedRequest);//meka return kalama append una headers thama return wenne
    }
}