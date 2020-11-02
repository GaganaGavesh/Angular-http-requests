import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
   title = 'Angular http Requests';

   loadedPosts = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchPosts();
  }

  onCreatePost(postData: { title: string; content: string }) {
    //send http request
    //me firebase link eka agata apata thawa ewa add karanna pluwn ewa firebasse eke directry wwidiyata watenawa
    //POST request ekak request body ekak expext karanawa

    //post request eka observable ekak return karanawa, eke ape request eka wrap karala tynawa
    //@return — An Observable of the response, with the response body as a JSON object.
    //Ekata thama me subscribe karala tynne

    this.http.post('https://ng-complete-guide-4fb9a.firebaseio.com/posts.json', 
    postData).subscribe(
      responseData=>{
        console.log(responseData);
      }
    );
    //Angular eka observables use karanawa godak, Http requests manage karanneth observables walin
    //Api uda hadapu http request ekata subscribe karala nathnam, angular and rxjs eka hithanawa kauruth response eka gana 
    //interest ne kiyala e nisa request eka yawanne wath ne 

    //firebase requirement ekak nisa .json danne
    //postdata kiyana object eka angular http client aragena eka automatically convert karanawa json data walata

    //console.log(postData);

    //---------------------------------------------------------------------------------------------------//
        //POST request ekak yawanakota OPTIONS kiyala method ekakin request ekakyawala balanawa post request 
        //send karanna allow karalada tynne balanna, 200 status code eka awoth ekata actual data tika POST karanawa
  }

  onFetchPosts() {
    // Send Http request
    this.fetchPosts();
  }

  onClearPosts() {
    // Send Http request
  }
  
  private fetchPosts(){

    //observable data tika subscribe wenna kalin pipe(eka eka operatoes walata danawa pipe eka athuledi) 
    //ekakata dala wenas karagannawa
    //map eken e wenas karapu data tika automatically re wrap karanawa observable ekata
    //eka thama anthimata subscribe wenne
    //response data thama original get eken enne, e tika thama map ekata aragena transform karanne
    //ena data wala encripted key ekak and object data thama tynne, e tika map eke athuledi array ekakata gannawa
    this.http.get('https://ng-complete-guide-4fb9a.firebaseio.com/posts.json')
    .pipe(map(responsedata=>{
      const postArray = [];
      for(const key in  responsedata){
        if(responsedata.hasOwnProperty(key)){//Determines whether an object has a property with the specified name.
          postArray.push({ ...responsedata[key], id: key });
        }
      }
      return postArray;
    }))
    .subscribe(//return postArray kiyana eka thama subscribe function ekata enne
      posts =>{
        console.log(posts);
      }
    );
  }

}
