/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { Component, EventEmitter, HostListener, OnDestroy, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { SearchResult, SearchResults, SearchService } from '../search.service';

export interface SearchArea {
  name: string;
  pages: SearchResult[];
  priorityPages: SearchResult[];
}

/**
 * A component to display the search results
 */
@Component({
  selector: 'aio-search-results',
  templateUrl: './search-results.component.html',
})
export class SearchResultsComponent implements OnInit, OnDestroy {

  private resultsSubscription: Subscription;
  readonly defaultArea = 'other';
  readonly topLevelFolders = ['guide', 'tutorial'];

  /**
   * Emitted when the user selects a search result
   */
  @Output()
  resultSelected = new EventEmitter<SearchResult>();

  /**
   * A mapping of the search results grouped into areas
   */
  searchAreas: SearchArea[] = [];

  constructor(private searchService: SearchService) {}

  ngOnInit() {
    this.resultsSubscription = this.searchService.searchResults
        .subscribe(search => this.searchAreas = this.processSearchResults(search));
  }

  ngOnDestroy() {
    this.resultsSubscription.unsubscribe();
  }

  onResultSelected(page: SearchResult, event: MouseEvent) {
    // Emit a `resultSelected` event if the result is to be displayed on this page.
    if (event.button === 0 && !event.ctrlKey && !event.metaKey) {
      this.resultSelected.emit(page);
    }
  }

  // Map the search results into groups by area
  private processSearchResults(search: SearchResults) {
    const searchAreaMap = {};
    search.results.forEach(result => {
      if (!result.title) { return; } // bad data; should fix
      const areaName = this.computeAreaName(result) || this.defaultArea;
      const area = searchAreaMap[areaName] = searchAreaMap[areaName] || [];
      area.push(result);
    });
    const keys = Object.keys(searchAreaMap).sort((l, r) => l > r ? 1 : -1);
    return keys.map(name => {
      let pages: SearchResult[] = searchAreaMap[name];

      // Extract the top 5 most relevant results as priorityPages
      const priorityPages = pages.splice(0, 5);
      pages = pages.sort(compareResults);
      return { name, pages, priorityPages };
    });
  }

  // Split the search result path and use the top level folder, if there is one, as the area name.
  private computeAreaName(result: SearchResult) {
    if (this.topLevelFolders.indexOf(result.path) !== -1) {
      return result.path;
    }
    const [areaName, rest] = result.path.split('/', 2);
    return rest && areaName;
  }
}

function compareResults(l: {title: string}, r: {title: string}) {
  return l.title.toUpperCase() > r.title.toUpperCase() ? 1 : -1;
}
