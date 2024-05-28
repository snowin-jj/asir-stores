import { atom } from 'nanostores';

export type Panel = 'ADMIN' | 'SALES' | 'HOME';

export const $activePanel = atom<Panel>('HOME');

export function changePanel(panel: Panel) {
    $activePanel.set(panel);
}
