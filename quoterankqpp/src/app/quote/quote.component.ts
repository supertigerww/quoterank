import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { Router, ActivatedRoute,Params } from '@angular/router'

@Component({
  selector: 'app-quote',
  templateUrl: './quote.component.html',
  styleUrls: ['./quote.component.css']
})
export class QuoteComponent implements OnInit {
  newquote;
  authorid;
  error;


  constructor(
    private _httpService:HttpService,
    private _route: ActivatedRoute,
    private _router: Router
  ) { }

  ngOnInit() {
    this._route.params.subscribe((params: Params) => this.authorid=params['authorid']);
    this.newquote={content:""}
  }

  addquote(){
    let obs = this._httpService.addquote(this.authorid,this.newquote);
    obs.subscribe(data => {
      console.log("add quote success",data);
      console.log("Add Success!",data);
      if (data['message'] == "QuoteError"){
        this.error=data['error']
        this._router.navigate(['/write/'+this.authorid])
      }else{
        this._router.navigate(['/quotes/'+this.authorid])

      }
    })
    
  }

}
