import { Routes } from '@angular/router';
import { KanbanBoardComponent } from './kanban-board/kanban-board.component';

export const routes: Routes = [
  { path: '', redirectTo: 'kanban-board', pathMatch: 'full' },
  { path: 'kanban-board', component: KanbanBoardComponent },
  // TODO: implement page not found component
  // { path: '**', component: PageNotFoundComponent }
];
