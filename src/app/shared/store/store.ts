import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DESKTOP } from '../config/applications';
import { Folder } from '../models/folder';
import { FolderSelection } from '../models/folder-selection';
import { BaseStore } from './base-store';
import { State } from './state';

const initialState: State = {
  activeApplication: DESKTOP,
  selectedFolderIds: [],
  deletedFolderIds: [],
  folders: [
    {
      id: 0,
      title: 'Desktop',
    },
    {
      id: 1,
      title: 'Untitled',
      parentFolderId: 0,
    },
    {
      id: 2,
      title: 'Tutorials',
      parentFolderId: 0,
    },
    {
      id: 3,
      title: 'Assets',
      parentFolderId: 2,
    },
  ],
};

@Injectable({ providedIn: 'root' })
export class Store extends BaseStore {
  activeApplication$: Observable<string> = this.select(
    (state) => state.activeApplication
  );

  trashItemsCount$: Observable<number> = this.select(
    (state) => state.deletedFolderIds.length
  );

  desktopFolders$: Observable<Folder[]> = this.select((state) =>
    state.folders
      .filter(
        (f) => f.parentFolderId === 0 && !state.deletedFolderIds.includes(f.id)
      )
      .map((f) => ({
        ...f,
        selected: state.selectedFolderIds.includes(f.id),
      }))
  );

  tutorialFolders$: Observable<Folder[]> = this.select((state) =>
    state.folders
      .filter(
        (f) => f.parentFolderId === 2 && !state.deletedFolderIds.includes(f.id)
      )
      .map((f) => ({
        ...f,
        selected: state.selectedFolderIds.includes(f.id),
      }))
  );

  trashFolders$: Observable<Folder[]> = this.select((state) =>
    state.folders.filter((f) => state.deletedFolderIds.includes(f.id))
  );

  constructor() {
    super(initialState);
  }

  setActiveApplication(activeAppId = DESKTOP) {
    this.setState({
      activeApplication: activeAppId,
    });
  }

  toggleFolder(folderSelection: FolderSelection) {
    if (folderSelection.selectedMultiple) {
      this.setState({
        selectedFolderIds: [
          ...this.state.selectedFolderIds,
          folderSelection.id,
        ],
      });
    } else {
      this.setState({
        selectedFolderIds: [folderSelection.id],
      });
    }
  }

  unselectAllFolders() {
    this.setState({
      selectedFolderIds: [],
    });
  }

  deleteSelectedFolders() {
    this.setState({
      deletedFolderIds: [
        ...this.state.deletedFolderIds,
        ...this.state.selectedFolderIds,
      ],
    });

    console.log(this.state.deletedFolderIds);
  }

  addNewFolder(): void {
    const newFoldersCount = this.state.folders.filter(
      (f) =>
        f.title.includes('New folder') &&
        !this.state.deletedFolderIds.includes(f.id)
    ).length;

    const newFolder = {
      id: Date.now(),
      title: `New folder${newFoldersCount > 0 ? `(${newFoldersCount})` : ''}`,
      parentFolderId: 0,
    };

    this.setState({
      folders: [...this.state.folders, newFolder],
    });
  }
}
