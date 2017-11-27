import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import Dictionary from 'typescript-collections/dist/lib/Dictionary';
import {isNullOrUndefined} from 'util';
import {GUID} from '../shared/guid.class';
import {Episode} from './episode.interface';
import LinkedList from 'typescript-collections/dist/lib/LinkedList';


interface MediaPlaylistServiceSubjects {
  playlist: BehaviorSubject<LinkedList<Episode>>,
  sidebarVisible: BehaviorSubject<boolean>
}

@Injectable()
export class MediaPlaylistService {

  public subjects = <MediaPlaylistServiceSubjects>{
    playlist: new BehaviorSubject<LinkedList<Episode>>(new LinkedList<Episode>()),
    sidebarVisible: new BehaviorSubject<boolean>(false)
  };
  private playlists: Dictionary<GUID, LinkedList<Episode>> = new Dictionary<GUID, LinkedList<Episode>>();
  private activePlaylist: GUID = undefined;
  private sidebarVisible = false;

  /**
   * Returns whether two episodes' ids are equal
   * @param e1
   * @param e2
   * @returns {boolean}
   */
  public static compare(e1: Episode, e2: Episode) {
    return e1.id === e2.id;
  }

  constructor() {
  }

  /**
   * Creates and registers a playlist
   * @param playlist
   */
  public registerPlaylist(playlist: GUID) {

    const q = isNullOrUndefined(playlist) ? new GUID() : playlist;

    if (!this.playlists.containsKey(q)) {
      this.playlists.setValue(q, new LinkedList<Episode>());
    }

    return q;
  }

  /**
   * Removes a registered playlist
   * @param playlist
   */
  public deregisterPlaylist(playlist: GUID) {
    this.playlists.remove(playlist);
  }

  /**
   * Removes all registered playlists
   */
  public deregisterAll() {
    this.playlists.clear();
    this.subjects.playlist.next(undefined);
  }

  /**
   * Returns registered playlists.
   * @returns {Dictionary<GUID, LinkedList<Episode>>}
   */
  public getPlaylists() {
    return this.playlists;
  }

  /**
   * Activates specified playlist
   * @param playlist
   * @returns {GUID}
   */
  public activate(playlist: GUID) {
    const q = this.registerPlaylist(playlist);
    this.activePlaylist = q;
    this.emit(q);
    return q;
  }

  /**
   * Deactivates specified playlist
   * @param playlist
   * @returns {GUID}
   */
  public deactivate(playlist: GUID) {
    if (!this.playlists.containsKey(playlist)) {
      return;
    }
    this.subjects.playlist.next(undefined);
    return playlist;
  }

  /**
   * Appends item(s) to active playlist
   * @param items
   */
  public enqueue(items: Episode[] | Episode) {

    const playlist = this.activate(this.activePlaylist); // Verify that there is a playlist active.
    const v: Episode[] = <Episode[]>[].concat(items);
    const updatedPlaylist: LinkedList<Episode> = this.playlists.getValue(playlist);

    for (let i = 0; i < v.length; i++) {
      updatedPlaylist.add(v[i]);
    }

    this.playlists.setValue(playlist, updatedPlaylist);
    this.emit(playlist);
  }

  /**
   * Removes item(s) from active playlist
   * @param items
   */
  public dequeue(items: Episode[] | Episode) {

    if (isNullOrUndefined(this.activePlaylist)) {
      return;
    }

    const updatedPlaylist: LinkedList<Episode> = this.playlists.getValue(this.activePlaylist);
    const v: Episode[] = <Episode[]>[].concat(items);

    for (let i = 0; i < v.length; i++) {
      updatedPlaylist.remove(v[i], MediaPlaylistService.compare);
    }
    this.playlists.setValue(this.activePlaylist, updatedPlaylist);
    this.emit(this.activePlaylist);
  }

  /**
   * Quick way to determine if active playlist contains item
   * @param item
   * @returns {boolean}
   */
  public contains(item: Episode) {

    if (isNullOrUndefined(this.activePlaylist)) {
      return false;
    }

    return this.playlists.getValue(this.activePlaylist).contains(item, MediaPlaylistService.compare);
  }

  /**
   * Retrieves and removes item first in line
   * @returns {Episode}
   */
  public pop() {

    if (isNullOrUndefined(this.activePlaylist)) {
      return;
    }

    const episode: Episode = this.playlists.getValue(this.activePlaylist).first();

    if (isNullOrUndefined(episode)) {
      return;
    }

    this.dequeue(episode);

    return episode;
  }

  /**
   * Clears active playlist
   */
  public clearPlaylist() {
    if (isNullOrUndefined(this.activePlaylist)) {
      return;
    }
    const updatedPlaylist: LinkedList<Episode> = this.playlists.getValue(this.activePlaylist);

    updatedPlaylist.clear();
    this.emit(this.activePlaylist);
  }

  /**
   * Toggles sidebar state
   * @returns {boolean}
   */
  public toggleSidebar() {
    this.sidebarVisible = !this.sidebarVisible;
    this.subjects.sidebarVisible.next(this.sidebarVisible);
    return this.sidebarVisible;
  }

  /**
   * Returns whether active playlist is empty
   * @returns {boolean}
   */
  public isEmpty() {
    if (isNullOrUndefined(this.activePlaylist)) {
      return true;
    }
    return this.playlists.getValue(this.activePlaylist).isEmpty();
  }

  /**
   * Emits new playlist values to subject
   * @param playlist
   */
  private emit(playlist: GUID) {
    this.subjects.playlist.next(this.playlists.getValue(playlist));
  }

}
