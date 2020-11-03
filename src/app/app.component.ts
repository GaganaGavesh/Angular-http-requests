import { Component, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { Post } from './post.model';
import { NgForm } from '@angular/forms';
import { postsService } from './posts.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
   title = 'Angular http Requests';
    @ViewChild('postForm') postForm: NgForm;
   loadedPosts: Post[]= [];
   isFetching = false;

  constructor(private http: HttpClient, private postsService: postsService) {}

  ngOnInit() {
    //load post when loding  of the component
    this.isFetching = true;
    this.postsService.fetchPosts()
    .subscribe(
      posts =>{
        this.loadedPosts = posts;
        this.isFetching = false;
        console.log(posts);
      }
    );
  }

  onCreatePost(postData: { title: string; content: string }) {
    //send http request
    //me firebase link eka agata apata thawa ewa add karanna pluwn ewa firebasse eke directry wwidiyata watenawa
    //POST request ekak request body ekak expext karanawa

    //post request eka observable ekak return karanawa, eke ape request eka wrap karala tynawa
    //@return — An Observable of the response, with the response body as a JSON object.
    //Ekata thama me subscribe karala tynne


    //me request response eka apata define karanna pluwn<name: string> //name: "-ML6SQaXWU9VpoETmH29"
    //response eka object ekak name: string tyena e nisa {name: string} kiyala object ekak widiyata danawa
    //generic http verb eke danna puluwan eka
    // this.http.post<{name: string}>('https://ng-complete-guide-4fb9a.firebaseio.com/posts.json', 
    // postData).subscribe(
    //   responseData=>{
    //     console.log(responseData);
    //     //this.fetchPosts();
    //   }
    // );
    this.postsService.createAndStoreposts(postData.title, postData.content);
    //Angular eka observables use karanawa godak, Http requests manage karanneth observables walin
    //Api uda hadapu http request ekata subscribe karala nathnam, angular and rxjs eka hithanawa kauruth response eka gana 
    //interest ne kiyala e nisa request eka yawanne wath ne 

    //firebase requirement ekak nisa .json danne
    //postdata kiyana object eka angular http client aragena eka automatically convert karanawa json data walata

    //console.log(postData);

    //---------------------------------------------------------------------------------------------------//
        //POST request ekak yawanakota OPTIONS kiyala method ekakin request ekakyawala balanawa post request 
        //send karanna allow karalada tynne balanna, 200 status code eka awoth ekata actual data tika POST karanawa
    this.postForm.reset();
    
  }

  onFetchPosts() {
    // Send Http request tho get the posts
    this.isFetching = true;
    this.postsService.fetchPosts()
    .subscribe(
      posts =>{
        this.loadedPosts = posts;
        this.isFetching = false;
        console.log(posts);
      }
    );
  }

  onClearPosts() {
    // Send Http request
  }
  
  // private fetchPosts(){
  //   this.isFetching = true;//start to fetch posts
  //   //observable data tika subscribe wenna kalin pipe(eka eka operatoes walata danawa pipe eka athuledi) 
  //   //ekakata dala wenas karagannawa
  //   //map eken e wenas karapu data tika automatically re wrap karanawa observable ekata
  //   //eka thama anthimata subscribe wenne
  //   //response data thama original get eken enne, e tika thama map ekata aragena transform karanne
  //   //ena data wala encripted key ekak and object data thama tynne, e tika map eke athuledi array ekakata gannawa

  //   this.http.get<{[key: string]: Post}>('https://ng-complete-guide-4fb9a.firebaseio.com/posts.json')
  //   //.pipe(map((responsedata: {[key: string]: Post})=>{ // key tyna kalla apata get eke dannath ahaki
  //   //ethakota response data eka ennema e dala tyna type ekata
  //   .pipe(map(responsedata=>{
  //     //ML6FxiU1rcJESJ4Y0WE: 
  //         //content: "nnnnnnnnnnnnnnn" 
  //         //title: "aaa"
  //     const postArray: Post[] = [];//post object tyna array ekak
  //     for(const key in  responsedata){
  //       if(responsedata.hasOwnProperty(key)){//Determines whether an object has a property with the specified name.
  //         postArray.push({ ...responsedata[key], id: key });
  //       }
  //     }
  //     return postArray;
  //   }))
  //   .subscribe(//return postArray kiyana eka thama subscribe function ekata enne
  //     posts =>{//{ ...responsedata[key], id: key } dala tyna nisa typescript eka danne ne meka mona wage type ekaka ekak da kiyala
  //       console.log(posts);
  //       this.isFetching = false;
  //       this.loadedPosts = posts;
  //     }
  //   );
  // }

}
