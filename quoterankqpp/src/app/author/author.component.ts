import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { Router, ActivatedRoute,Params } from '@angular/router'

@Component({
  selector: 'app-author',
  templateUrl: './author.component.html',
  styleUrls: ['./author.component.css']
})
export class AuthorComponent implements OnInit {
  newauthor:any;
  error:any;
  existerror:any;

  constructor(
    private _httpService:HttpService,
    private _route: ActivatedRoute,
    private _router: Router
  ) { }

  ngOnInit() {
    this.newauthor={name:"",quote:[]}

  }

  addauthor(){
    let observable =this._httpService.addauthor(this.newauthor);
    observable.subscribe(data=> {
      console.log("Add Success!",data);
      if (data['message'] == "Error"){
        this.error=data['errors']
        this._router.navigate(['/new'])
        this.existerror=""
      }
      else if(data['message'] == "ExistError"){
        this.existerror = data
        this._router.navigate(['/new'])
        this.error=""
      }
      else{
        this._router.navigate(['/'])

      }
      
    })
  }

}
