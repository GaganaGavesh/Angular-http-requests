import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

import { Post } from './post.model';

@Injectable({providedIn: 'root'})// module.ts wala root eke dammath hari
export class postsService{

    constructor(private http: HttpClient){}

    createAndStoreposts(title: string, content: string){
        
        const postData: Post = {title: title, content: content}
        //post data
        this.http.post<{name: string}>('https://ng-complete-guide-4fb9a.firebaseio.com/posts.json', 
        postData).subscribe(
          responseData=>{
            console.log(responseData);
          });//me ena response eken component ekata wadak nathnam 
          //subscribe eka methana dammata aulak ne 
          //component ekata e data gannawa nam subscribe eka component eke dana eka thama hoda

    }

    fetchPosts(){
      //meken observable ekak return karanawa 
      //eka subscribe karala nathnam me request eka yanne ne
      //kauruth interest nathnam request eka yawanne ne e nisa kohe hari subscribe karala tyenna ona
    return this.http.get<{[key: string]: Post}>('https://ng-complete-guide-4fb9a.firebaseio.com/posts.json')
    .pipe(map(responsedata=>{
      const postArray: Post[] = [];//post object tyna array ekak
      for(const key in  responsedata){
        if(responsedata.hasOwnProperty(key)){//Determines whether an object has a property with the specified name.
          postArray.push({ ...responsedata[key], id: key });
        }
      }
      return postArray;
    })
    );
    }

    

}