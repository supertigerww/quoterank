import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { Router, ActivatedRoute,Params } from '@angular/router'

@Component({
  selector: 'app-authorquote',
  templateUrl: './authorquote.component.html',
  styleUrls: ['./authorquote.component.css']
})
export class AuthorquoteComponent implements OnInit {
  author=[];
  authorid;
  quoteid;
  lolid;
  constructor(
    private _httpService:HttpService,
    private _route: ActivatedRoute,
    private _router: Router
  ) { }

  ngOnInit() {
    this._route.params.subscribe((params: Params) => this.authorid=params['authorid']); 
    this.getAuthorFromService(this.authorid);
    this.lolid=this.getlolid();
    console.log("this is lolid",this.lolid)
  }
  getAuthorFromService(authorid){
    let obs = this._httpService.getauthor(this.authorid)
    obs.subscribe(data=> {
      console.log("Got this author",data)
      this.author = data['data']['quotes']
    })
  }

  upvote(quoteid){
    let obs =  this._httpService.upvotequote(this.authorid,quoteid);
    obs.subscribe(data => {console.log("upvote success",data)})
    this.getAuthorFromService(this.authorid)
  }

  downvote(quoteid){
    let obs =  this._httpService.downvotequote(this.authorid,quoteid);
    obs.subscribe(data => {console.log("downvote success",data)})
    this.getAuthorFromService(this.authorid)
  } 

  deletequote(quoteid){
    console.log(quoteid);
    let obs =  this._httpService.deletequote(this.authorid,quoteid);
    obs.subscribe(data => {console.log("delete success",data)})
    this.getAuthorFromService(this.authorid)
  }

  getlolid(){
    return this._httpService.tempid
  }
}
