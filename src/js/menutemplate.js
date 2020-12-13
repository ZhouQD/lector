"use strict";
/*------------------------------------------------------------------------------
 *  Copyright (c) 2019 Sagar Gurtu
 *  Licensed under the MIT License.
 *  See License in the project root for license information.
 *----------------------------------------------------------------------------*/

const { app, dialog, BrowserWindow } = require('electron');

/**
 * @param {BrowserWindow} win
 */
exports.buildMenuTemplate = (win) => {
    return [
        {
            label: 'File',
            submenu: [
                {
                    label: 'Open...',
                    id: 'file-open',
                    accelerator: 'CmdOrCtrl+O',
                    async click() {
                        try {
                            const result = await dialog.showOpenDialog(win, {
                                properties: ['openFile'],
                                filters: [
                                    { name: 'PDF Files', extensions: ['pdf'] }
                                ]
                            });

                            if (result.filePaths.length == 1) {
                                win.webContents.send('file-open',
                                    result.filePaths[0]
                                )
                            }
                        } catch (error) {
                            console.log(error)
                        }
                    }
                },
                {
                    label: 'Print...',
                    id: 'file-print',
                    accelerator: 'CmdOrCtrl+P',
                    enabled: false,
                    click() {
                        win.webContents.send('file-print')
                    }
                },
                {
                    type: 'separator'
                },
                {
                    label: 'Properties...',
                    id: 'file-properties',
                    enabled: false,
                    click() {
                        win.webContents.send('file-properties')
                    }
                },
                {
                    type: 'separator'
                },
                {
                    label: 'Close',
                    id: 'file-close',
                    enabled: false,
                    click() {
                        win.webContents.send('file-close')
                    }
                },
                {
                    label: 'Exit',
                    click() {
                        app.quit()
                    }
                }
            ]
        },
        {
            label: 'View',
            submenu: [
                {
                    label: 'Toggle Full Screen',
                    id: 'view-fullscreen',
                    enabled: false,
                    accelerator: 'F11',
                    click() {
                        win.webContents.send('view-fullscreen')
                    }
                }
            ]
        },
        {
            label: 'Help',
            submenu: [
                {
                    label: 'About',
                    id: 'about'
                }
            ]
        }

    ];
};
