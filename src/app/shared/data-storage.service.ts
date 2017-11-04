import { Injectable } from '@angular/core';

import 'rxjs/Rx';

import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';
import { AuthService } from '../auth/auth.service';
import { HttpClient, HttpHeaders, HttpParams, HttpRequest } from '@angular/common/http';

@Injectable()
export class DataStorageService {
  constructor(private httpClient: HttpClient,
              private recipeService: RecipeService,
              private authService: AuthService) {
  }

  storeRecipes() {
    // const headers =  HtttpHeaders().set('Authorization', 'Stuff');
    // return this.httpClient.put('https://http-test-e1b7e.firebaseio.com/recipes.json', this.recipeService.getRecipes(),
    // {
    //   observe: 'body',
    //   params: new HttpParams().set('auth', token)
    //   //headers: headers
    // });

    const req =  new HttpRequest('PUT', 'https://http-test-e1b7e.firebaseio.com/recipes.json', this.recipeService.getRecipes(),
    {
      reportProgress: true, // useful for uploading & downloading stuff.
    })
    return this.httpClient.request(req);
  }

  getRecipes() {
    /*
     get can be generic type so we can be more explicit on what to expect
     this.httpClient.get<Recipe[]>('https://ng-recipe-5d0ef.firebaseio.com/recipes.json?auth=' + token)
    */
    this.httpClient.get<Recipe[]>('https://http-test-e1b7e.firebaseio.com/recipes.json?auth=' , {
      observe: 'body',
      responseType: 'json'
    })
      .map(
        (recipes) => {
          for (let recipe of recipes) {
            if (!recipe['ingredients']) {
              recipe['ingredients'] = [];
            }
          }
          return recipes;
        }
      )
      .subscribe(
        (recipes: Recipe[]) => {
          this.recipeService.setRecipes(recipes);
        }
      );
  }
}
