
import { CreateCake, ViewCake, ViewCakes } from '../containers';
import { RouteProps } from 'react-router';

export type SiteRoute = RouteProps & {
    id: string;
    title: string;
    path: string;
}
export const routes: SiteRoute[] = [
    {
        component: ViewCake,
        exact: true,
        id: 'view',
        path: '/cake/:id',
        title: 'View Cake',
    },
    {
        component: CreateCake,
        exact: true,
        id: 'create',
        path: '/cakes/add',
        title: 'Add A Cake',
    },
    {
        component: ViewCakes,
        exact: true,
        id: 'view-cakes',
        path: '/',
        title: 'View Cakes',
    }
];