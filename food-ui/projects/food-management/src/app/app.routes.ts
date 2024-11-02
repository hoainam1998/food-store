import { Routes } from '@angular/router';
// import { LoginComponent } from '@views/login/login.component';
import { HomeComponent } from '@views/home/home.component';
import { CategoryComponent } from '@views/category/category.component';
import { FoodComponent } from '@views/food/food.component';
import { FoodListComponent } from '@views/food/food-list/food-list.component';
import { FoodDetailComponent } from '@views/food/food-detail/food-detail.component';
import paths from '@paths';

export const routes: Routes = [
  {
    path: paths.DEFAULT,
    // component: LoginComponent,
    redirectTo: paths.HOME,
    pathMatch: 'full'
  },
  {
    path: paths.HOME,
    component: HomeComponent,
    children: [
      {
        path: '',
        redirectTo: paths.FOOD,
        pathMatch: 'full'
      },
      {
        path: paths.CATEGORY,
        component: CategoryComponent
      },
      {
        path: paths.FOOD,
        component: FoodComponent,
        children: [
          {
            path: paths.DEFAULT,
            component: FoodListComponent
          },
          {
            path: paths.ID,
            component: FoodDetailComponent
          }
        ]
      }
    ]
  },
];
