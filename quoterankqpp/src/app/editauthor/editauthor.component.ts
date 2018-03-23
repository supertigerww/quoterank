import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { Router,ActivatedRoute,Params } from '@angular/router';

@Component({
  selector: 'app-editauthor',
  templateUrl: './editauthor.component.html',
  styleUrls: ['./editauthor.component.css']
})
export class EditauthorComponent implements OnInit {
  id;
  author;
  error;
  existerror;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _httpService:HttpService
  ) { }

  ngOnInit() {
    this._route.params.subscribe((params: Params) => this.id=params['authorid']);
    console.log(this.id);
    this.showauthor(this.id);
    

  }

  showauthor(id){
    let obs = this._httpService.getauthor(this.id);
    obs.subscribe(data=>{
      console.log("got this author",data)
      this.author=data['data']
    })
  }

  editauthor(id,author){
    let observable = this._httpService.editauthorname(id,this.author);
    observable.subscribe(data => {console.log("Edit Success",data);
    if (data['message'] == "Error"){
      this.error=data['errors']['errors']['name']['message']
      this._router.navigate(['/edit/'+id])
      this.existerror="";
    }
    else if (data['message'] == "ExistError"){
      this.existerror=data['error']
      this._router.navigate(['/edit/'+id])
      this.error="";}
    else{
      this._router.navigate(['/'])

    }
  })
}
}

