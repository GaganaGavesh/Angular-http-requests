import { HttpEventType, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { tap } from 'rxjs/operators';
//Interceptor waladi request ekata headers append karanawa 
//meka server user authentication waladi ehema wadagath wenawa
export class AuthInterceptorService implements HttpInterceptor{
    intercept(req: HttpRequest<any>, next: HttpHandler){
        // console.log('Request is on the way');
        // console.log(req.url);
        //request objects immutable e nisa wena value set karanna be 
        //req.url = 'a new url';//meheama danna be
        const modifiedRequest = req.clone({headers: req.headers.append('Auth','xyz')});
        //headers walata dala tyna eka append wela thama yanne 'modifiedRequest' variable eka
        //const modifiedRequest = req.clone({url: 'some new url',params:  ,headers: req.headers.append('print','gagana')});
        //clone eka athule apata override karanna pluwn 
        //onama core deyak me object eke

        //return next.handle(req);//Aapp eka yawana onama request ekakata me method eka run wenawa
        //e nisa wena wenama headers dada inna ona ne podu ewa serama mekata danna pluwan

        //handle eken return karanneth observable ekak
        //eka subscribe karanna pluwn
        return next.handle(modifiedRequest)
        // .pipe(tap(
        //     event=>{
        //         console.log(event);
        //         if(event.type == HttpEventType.Response){
        //             console.log('Response arrived');
        //             console.log(event.body);
        //         }
        //     }//map operator rka unath pluwa 
        //     //data tika transform karanna wage ona nam
        // ));//meka return kalama append una headers thama return wenne
    }
}