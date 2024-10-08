import { atom } from 'nanostores';

export type Panel = 'ADMIN' | 'SALES' | 'HOME';

export const $activePanel = atom<Panel>(
    window.location.hash.includes('sales')
        ? 'SALES'
        : window.location.hash.includes('admin')
          ? 'ADMIN'
          : 'HOME',
);

export function changePanel(panel: Panel) {
    $activePanel.set(panel);
}
