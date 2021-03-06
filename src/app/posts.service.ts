import { HttpClient, HttpHeaders, HttpParams, HttpEventType } from '@angular/common/http';
import { StringMapWithRename } from '@angular/compiler/src/compiler_facade_interface';
import { Injectable } from '@angular/core';
import { Subject, throwError } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';

import { Post } from './post.model';

@Injectable({providedIn: 'root'})// module.ts wala root eke dammath hari
export class postsService{

    error = new Subject<String>();// me subject ekata subscribe kalama create and store weddi ena errors ganna pluwn

    constructor(private http: HttpClient){}

    createAndStoreposts(title: string, content: string){
        
        const postData: Post = {title: title, content: content}
        //post data
        this.http.post<{name: string}>('https://ng-complete-guide-4fb9a.firebaseio.com/posts.json', 
        postData,
        {
          observe: 'response'
        })
        .subscribe(
          responseData=>{
            console.log(responseData);
          },error=>{
            this.error.next(error.message);
          });//me ena response eken component ekata wadak nathnam 
          //subscribe eka methana dammata aulak ne 
          //component ekata e data gannawa nam subscribe eka component eke dana eka thama hoda

    }

    fetchPosts(){
      //meken observable ekak return karanawa 
      //eka subscribe karala nathnam me request eka yanne ne
      //kauruth interest nathnam request eka yawanne ne e nisa kohe hari subscribe karala tyenna ona
      //pipe eke map wagema thawa catchError kiyala function ekak nuth danna pluwn.
      //fetch ekedi ena error ekak handle karanna ona una nam methenta catchError kiyanna eka danawa
      
      //Special headers Ex:- authorization header(that authorize the user)
      //onama hhtp service method ekaka anthima argumant eka widiyata yawana object eke thama headers dala yawane
    let searchparams = new HttpParams();
    searchparams = searchparams.append('print','pretty');//firebase eke doc wala tyna ekak meka//response tab eke post print wenawa
    searchparams = searchparams.append('custom','tada');//dana dana eka append wenawa ekama variable ekata
    console.log(searchparams);//Appends a new value to existing values for a parameter.
    return this.http.get<{[key: string]: Post}>('https://ng-complete-guide-4fb9a.firebaseio.com/posts.json',
    {
      headers: new HttpHeaders(
        {
          'Custom-Header': 'Hello There'//mekata denna pluwan headers wala hey value pairs
        }
      ),
      //params: new HttpParams().set('print','pretty')//set(param: string, value: string)
      params: searchparams,
      responseType: 'json'//apata ganna ona eka text format eken tynna ona kiyala angular ekata kiyanna ona nam 
      //methana 'text' kiyala denna pluwan ethakota angular eka eka json walata convert karan ne
    })
    .pipe(map(responsedata=>{
      const postArray: Post[] = [];//post object tyna array ekak
      for(const key in  responsedata){
        if(responsedata.hasOwnProperty(key)){//Determines whether an object has a property with the specified name.
          postArray.push({ ...responsedata[key], id: key });
        }
      }
      return postArray;
        }),
        catchError((errorRes)=>{
          //send to analytic server//subject ekak dana error message eka next karannath ahaki
          //eka wena thanaka subscribe karala e error eka ganna pluwn
          //error ekak awama karanna ona background stuff methana karanna pluwn ex log karanna ,background server ekakata yawanna
          //e karana ewa kalata passee "throwError" kiyala observable ekakin error eka ain karala danawa 
          //throw karanawa
          //Generic error handling task ekak karanna ona nam eka thama methana karanne
          return throwError(errorRes);
        })
      );
    }

    deletePosts(){
      return this.http.delete('https://ng-complete-guide-4fb9a.firebaseio.com/posts.json',
      {
        observe: 'events'
      }).pipe(tap(event=>{
        console.log(event);
        if(event.type== HttpEventType.Sent){
          //Request eka send kala //response ekata waiting innawa kiyala thama methana sent eke kiyanne
          //e athare apata meka pennanna pluwn UI eke api request eka sent kala kiyala
          //mewagen data aragena api app eke mona phase eke innawada kiyala userta details denna pluwn
        }
        if(event.type== HttpEventType.Response){
          console.log(event.body);//event eka thama tap eken ena object eka eke ona property ekak access karanna ahaki
        }
      }));
      //ppost nde eke tyna serama ewa delete wenawaa
    }

    

}