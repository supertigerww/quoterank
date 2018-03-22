import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AuthorComponent } from './author/author.component';
import { AuthorquoteComponent } from './authorquote/authorquote.component';
import { QuoteComponent } from './quote/quote.component';

const routes: Routes = [
  {path:'',component:HomeComponent},
  {path:'new',component:AuthorComponent},
  {path:'quotes/:authorid',component:AuthorquoteComponent},
  {path:'write/:authorid',component:QuoteComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
