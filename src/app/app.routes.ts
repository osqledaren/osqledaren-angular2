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
import {PrintedIssuesComponent} from './site/printed-issues/printed-issues/printed-issues.component';

/**
 * Definition of broadcast routes
 * @type Routes
 */
const BROADCAST: Routes = [
  {
    path: 'play',
    component: PlayComponent,
    data: {name: 'play'},
    children: [
      {
        path: 'senaste-nytt',
        component: EpisodeGridComponent,
        data: {name: 'Senaste Nytt'}
      },
      {
        path: 'serier',
        component: SeriesComponent,
        data: {name: 'Serier'},
        children: [
          {
            path: ':series',
            component: SingleSeriesComponent,
            data: {name: 'Serie'}
          }
        ]
      },
      {
        path: '',
        component: EpisodeGridComponent,
        data: {name: 'Senaste Nytt'}
      }
    ]
  }
];

/**
 * Definition of site routes
 * @type Routes
 */
const POST: Routes = [
  {
    path: 'artikel/:slug',
    component: ArticleComponent,
    data: {name: 'article'}
  },
  {
    path: 'nyheter',
    component: NewsArchiveComponent,
    data: {name: 'articles'}
  },
  {
    path: 'nyheter/sok/:searchTerm',
    component: NewsArchiveComponent,
    data: {name: 'search'}
  },
  {
    path: 'nyheter/arkiv/:date/:searchTerm',
    component: NewsArchiveComponent,
    data: {name: 'archive'}
  },
  {
    path: 'nyheter/arkiv/:date',
    component: NewsArchiveComponent,
    data: {name: 'archive'}
  },
  {
    path: '',
    component: NewsArchiveComponent,
    data: {name: 'home'}
  }
];

/**
 * Definition of post routes
 * @type Routes
 */
const SITE: Routes = [
  {
    path: 'annonsera',
    data: {name: 'advertise'}
  },
  {
    path: 'error',
    component: ErrorComponent,
    data: {name: 'error'}
  },
  {
    path: 'om-oss',
    component: AboutComponent,
    data: {name: 'about'}
  },
  {
    path: 'sok-redaktionen',
    component: ComingSoonComponent,
    data: {name: 'coming-soon'}
  },
  {
    path: 'pods',
    component: ComingSoonComponent,
    data: {name: 'coming-soon'}
  },
  {
    path: 'tidningen',
    component: PrintedIssuesComponent,
    data: {name: 'printed-issues'}
  },
  {
    path: '**',
    component: PageNotFoundComponent,
    data: {name: '404'}
  }
];

/**
 * Exportable global route collection
 * @type Routes
 */
export const ROUTES: Routes = [
  ...BROADCAST,
  ...SITE,
  ...POST
];
