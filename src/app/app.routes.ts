import {Routes} from '@angular/router';
import {ErrorComponent} from './site/error/error.component';
import {AboutComponent} from './site/about/about.component';
import {ComingSoonComponent} from './site/coming-soon/coming-soon.component';
import {PageNotFoundComponent} from './site/page-not-found/page-not-found.component';
import {ArticleComponent} from './post/article/article.component';
import {NewsArchiveComponent} from './post/news-archive/news-archive.component';
import {PlayComponent} from './broadcast/play/play.component';
import {EpisodeGridComponent} from './broadcast/episode-grid/episode-grid.component';
import {SeriesComponent} from './broadcast/series/series.component';
import {SingleSeriesComponent} from './broadcast/single-series/single-series.component';
import {PrintedIssuesComponent} from './printed-issues/printed-issues/printed-issues.component';
import {AdvertiseComponent} from './site/advertise/advertise.component';
import {AppLoadableDeactivateGuard} from './ui/ui-view-loadable-deactivate.guard';
import {ApplyComponent} from './site/apply/apply.component';

/**
 * Definition of broadcast routes
 * @type Routes
 * kommentar
 */
const BROADCAST: Routes = [
  {
    path         : 'play',
    component    : ComingSoonComponent,
    canDeactivate: [AppLoadableDeactivateGuard],
    data         : {name: 'play'},
    children     : [
      {
        path     : 'senaste-nytt',
        component: EpisodeGridComponent,
        data     : {name: 'Senaste Nytt'}
      },
      {
        path     : 'serier',
        component: SeriesComponent,
        data     : {name: 'Serier'},
        children : [
          {
            path     : ':series',
            component: SingleSeriesComponent,
            data     : {name: 'Serie'}
          }
        ]
      },
      {
        path     : '',
        component: EpisodeGridComponent,
        data     : {name: 'Senaste Nytt'}
      }
    ]
  },
  {
    path         : 'pods',
    component    : ComingSoonComponent,
    canDeactivate: [AppLoadableDeactivateGuard],
    data         : {name: 'pods'},
  }
];

/**
 * Definition of site routes
 * @type Routes
 */
const POST: Routes = [
  {
    path         : 'artikel/:slug',
    component    : ArticleComponent,
    canDeactivate: [AppLoadableDeactivateGuard],
    data         : {name: 'article'}
  },
  {
    path         : 'nyheter/:slug',
    component    : ArticleComponent,
    canDeactivate: [AppLoadableDeactivateGuard],
    data         : {name: 'article'}
  },
  {
    path         : 'nyheter',
    component    : NewsArchiveComponent,
    canDeactivate: [AppLoadableDeactivateGuard],
    data         : {name: 'articles'}
  },
  {
    path         : 'nyheter/sok/:searchTerm',
    component    : NewsArchiveComponent,
    canDeactivate: [AppLoadableDeactivateGuard],
    data         : {name: 'search'}
  },
  {
    path         : 'nyheter/arkiv/:date/:searchTerm',
    component    : NewsArchiveComponent,
    canDeactivate: [AppLoadableDeactivateGuard],
    data         : {name: 'archive'}
  },
  {
    path         : 'nyheter/arkiv/:date',
    component    : NewsArchiveComponent,
    canDeactivate: [AppLoadableDeactivateGuard],
    data         : {name: 'archive'}
  },
  {
    path         : '',
    component    : NewsArchiveComponent,
    canDeactivate: [AppLoadableDeactivateGuard],
    data         : {name: 'home'}
  }
];

/**
 * Definition of post routes
 * @type Routes
 */
const SITE: Routes = [
  {
    path         : 'annonsera',
    component    : AdvertiseComponent,
    canDeactivate: [AppLoadableDeactivateGuard],
    data         : {name: 'advertise'}
  },
  {
    path         : 'error',
    component    : ErrorComponent,
    canDeactivate: [AppLoadableDeactivateGuard],
    data         : {name: 'error'}
  },
  {
    path         : 'om-oss',
    component    : AboutComponent,
    canDeactivate: [AppLoadableDeactivateGuard],
    data         : {name: 'about'}
  },
  {
    path         : 'sok-redaktionen',
    component    : ComingSoonComponent,
    canDeactivate: [AppLoadableDeactivateGuard],
    data         : {name: 'coming-soon'}
  },
  // {
  //   path         : 'play',
  //   component    : ComingSoonComponent,
  //   canDeactivate: [AppLoadableDeactivateGuard],
  //   data         : {name: 'coming-soon'}
  // },
  {
    path         : 'pods',
    component    : ComingSoonComponent,
    canDeactivate: [AppLoadableDeactivateGuard],
    data         : {name: 'coming-soon'}
  },
  {
    path         : 'tidningen',
    component    : PrintedIssuesComponent,
    canDeactivate: [AppLoadableDeactivateGuard],
    data         : {name: 'printed-issues'}
  }
];

/**
 * Exportable global route collection
 * @type Routes
 */
export const ROUTES: Routes = [
  ...BROADCAST,
  ...SITE,
  ...POST,
  {
    path         : '**',
    component    : PageNotFoundComponent,
    canDeactivate: [AppLoadableDeactivateGuard],
    data         : {name: '404'}
  }
];
