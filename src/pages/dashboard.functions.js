import { storage } from '../core/utils';

function toHTML(key) {
  const model = storage(key);
  const id = key.split(':')[1];

  return `    <li class="db__record">
              <a href="#excel/${id}">${model.title}</a>
              <strong>
              ${new Date(model.lastOpenedDate).toLocaleDateString()}
              ${new Date(model.lastOpenedDate).toLocaleTimeString()}
              </strong>
            </li>`;
}

function getAllKeys() {
  const keys = [];
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key.includes('excel')) {
      keys.push(key);
    }
  }
  return keys;
}

export function createRecordsTable() {
  const keys = getAllKeys();
  if (!keys.length) {
    return ` <p class="db__info no-spreadsheets">No spreadsheets to show</p>`;
  }
  return `<div class="db__list-header">
            <span>Title</span>
            <span>Last opened</span>
          </div>
          <ul class="db__list">
          ${keys.map(toHTML).join('')}
          </ul>`;
}
