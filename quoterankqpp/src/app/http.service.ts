import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable()
export class HttpService {

  tempid;

  constructor(private _http:HttpClient) { }

  getauthors(){
    return this._http.get('/authors')
  }
  getauthor(authorid){
    this.tempid = authorid;
    return this._http.get('/authors/'+authorid)
  }

  upvotequote(authorid,quoteid){
    return this._http.post('/upquote/'+authorid,{id:quoteid})
  }

  downvotequote(authorid,quoteid){
    return this._http.post('/downquote/'+authorid,{id:quoteid})
  }

  deletequote(authorid,quoteid){
    console.log(quoteid)
    return this._http.post('/deletequote/'+authorid,{id:quoteid})
  }

  addauthor(newauthor){
    return this._http.post('/authors',newauthor)
  }

  addquote(authorid,newquote){
    console.log(authorid);
    console.log(newquote);
    return this._http.post('/quotes/'+authorid,newquote)
  }

  editauthorname(authorid, updatedauthor){
    console.log(updatedauthor);
    return this._http.put('/authors/'+authorid,updatedauthor)
  }
  getid(){
    return this.tempid;
  }
}
