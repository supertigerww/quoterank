import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { Router, ActivatedRoute,Params } from '@angular/router'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  authors=[];

  constructor(
    private _httpService:HttpService,
    private _route: ActivatedRoute,
    private _router: Router
  ) { }

  ngOnInit() {
    this.getAuthorFromService();
  }
  getAuthorFromService(){
    let obs = this._httpService.getauthors();
    obs.subscribe(data =>
    {console.log("Got all authors",data)
    this.authors=data['data'] 
})
}
  showquotes(authorid){
    this._router.navigate(['/quotes/'+authorid])
  }




}
