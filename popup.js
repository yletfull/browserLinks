// popup.js
document.addEventListener('DOMContentLoaded', function () {
  const button = document.getElementById('mainButton');
  const savedLinksList = document.getElementById('savedLinks');
  const groupList = document.getElementById('groupList');
  const groups = JSON.parse(localStorage.getItem('groups')) || [];
  let openGroups = JSON.parse(localStorage.getItem('openGroups')) || [];

  const modal = document.getElementById('myModal');
  const closeModal = document.getElementById('closeModal');
  const saveButton = document.getElementById('saveButton');
  const titleInput = document.getElementById('title');
  const urlInput = document.getElementById('url');
  const groupInput = document.getElementById('group');

  function openModal() {
    modal.style.display = 'block';
    titleInput.value = '';
    urlInput.value = '';
    groupInput.value = '';
  }

  function onCloseModal() {
    modal.style.display = 'none';
    titleInput.value = '';
    urlInput.value = '';
    groupInput.value = '';
  }

  button.addEventListener('click', openModal);
  closeModal.addEventListener('click', onCloseModal);

  saveButton.addEventListener('click', function () {
    const title = titleInput.value.trim();
    const url = urlInput.value.trim();
    const group = groupInput.value.trim() || 'Без категории';

    if (title && url) {
      saveLink(title, url, group);
      updateSavedLinks();
      onCloseModal();
    } else {
      alert('Пожалуйста, введите корректное описание и URL.');
    }
  });

  function saveLink(title, url, group) {
    const existingLinks = JSON.parse(localStorage.getItem('savedLinks')) || [];
    existingLinks.push({ title, url, group });
    localStorage.setItem('savedLinks', JSON.stringify(existingLinks));

    // Если указана группа и её еще нет в списке, добавляем
    if (group && !groups.includes(group)) {
      groups.push(group);
      localStorage.setItem('groups', JSON.stringify(groups));
      toggleGroup(group);
    }
  }

  function deleteLink(e, index) {
    e.stopPropagation();

    const existingLinks = JSON.parse(localStorage.getItem('savedLinks')) || [];
    const deletedLink = existingLinks.splice(index, 1)[0];
    localStorage.setItem('savedLinks', JSON.stringify(existingLinks));

    // Если удаленная ссылка имела группу и это была последняя ссылка в группе, удаляем группу
    if (deletedLink.group && existingLinks.every(link => link.group !== deletedLink.group)) {
      groups.splice(groups.indexOf(deletedLink.group), 1);
      localStorage.setItem('groups', JSON.stringify(groups));
    }

    // Обновление списка сохраненных ссылок
    updateSavedLinks();
  }

  function goLink(e, url) {
    window.open(url, '_blank');
  }

  function copyLink(e, url) {
    e.stopPropagation();

    const alert = document.createElement('div');
    const text = document.createElement('p');

    text.classList.add('alert__text');
    alert.classList.add('alert_hide');

    navigator.clipboard.writeText(url)
      .then(() => {
        text.textContent = 'Успешно скопировано';

        alert.classList.replace('alert_hide', 'alert_show');
        alert.appendChild(text);

        document.body.appendChild(alert);
      })
      .catch(err => {
        text.textContent = 'Ошибка';

        alert.classList.replace('alert_hide', 'alert_show');
        alert.appendChild(text);

        document.body.appendChild(alert);
      }).finally(() => {
      setTimeout(() =>  { alert.classList.replace('alert_show', 'alert_hide'); }, 1000 );
    });
  }

  function updateSavedLinks() {
    savedLinksList.innerHTML = '';
    const existingLinks = JSON.parse(localStorage.getItem('savedLinks')) || [];

    if (existingLinks.length === 0) {
      const noLinksMessage = document.createElement('p');
      noLinksMessage.textContent = 'Нет сохраненных записей.';
      savedLinksList.appendChild(noLinksMessage);
    } else {
      existingLinks.forEach((link, index) => {
        if (!openGroups.includes(link.group)) {
          return; // Пропускаем ссылку, если группа закрыта
        }

        const li = document.createElement('li');
        const liText = document.createElement('p');
        const deleteButton = document.createElement('button');
        const copyLinkButton = document.createElement('button');
        const goLinkButton = document.createElement('button');
        const buttonsWrapper = document.createElement('div');

        goLinkButton.classList.add('go-link-button');
        goLinkButton.textContent = 'Переход';
        li.addEventListener('click', (e) => goLink(e, link.url));

        copyLinkButton.classList.add('copy-link-button');
        copyLinkButton.textContent = 'Копировать';
        copyLinkButton.addEventListener('click', (e) => copyLink(e, link.url));

        deleteButton.classList.add('delete-button');
        deleteButton.textContent = 'Удалить';
        deleteButton.addEventListener('click', (e) => deleteLink(e, index));

        liText.textContent = `${link.title}`;
        liText.classList.add('title');

        li.appendChild(liText);

        buttonsWrapper.appendChild(goLinkButton);
        buttonsWrapper.appendChild(copyLinkButton);
        buttonsWrapper.appendChild(deleteButton);

        li.appendChild(buttonsWrapper);
        savedLinksList.appendChild(li);
      });
    }

    updateGroupList();
  }

  function updateGroupList() {
    groupList.innerHTML = '<div>Фильтр категорий:</div>';

    groups.forEach(group => {
      const groupItem = document.createElement('div');
      groupItem.classList.add('group-item');
      if (openGroups.includes(group)) {
        groupItem.classList.add('active');
      }
      groupItem.textContent = group;
      groupItem.addEventListener('click', () => toggleGroup(group));
      groupList.appendChild(groupItem);
    });
  }

  function toggleGroup(group) {
    if (openGroups.includes(group)) {
      openGroups = openGroups.filter(g => g !== group);
    } else {
      openGroups.push(group);
    }
    localStorage.setItem('openGroups', JSON.stringify(openGroups));
    updateSavedLinks();
  }

  // При первой загрузке обновляем список сохраненных ссылок
  updateSavedLinks();
});
