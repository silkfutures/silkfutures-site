const enquiryForm = document.querySelector('.enquiry-panel form');
const offerSelect = document.querySelector('#offer');

document.querySelectorAll('[data-offer]').forEach(link => {
  link.addEventListener('click', () => {
    offerSelect.value = link.dataset.offer;
  });
});

enquiryForm.addEventListener('submit', event => {
  event.preventDefault();
  const data = new FormData(enquiryForm);
  const lines = [
    'Hello Silkfutures,',
    '',
    'I’d like to discuss commissioning ' + data.get('offer') + '.',
    '',
    'Organisation: ' + data.get('organisation'),
  ];

  if (data.get('group')) lines.push('Group size: ' + data.get('group'));
  if (data.get('dates')) lines.push('Preferred dates: ' + data.get('dates'));
  if (data.get('details')) lines.push('', data.get('details'));
  lines.push('', 'Thanks');

  const subject = encodeURIComponent('Silkfutures commissioning enquiry — ' + data.get('offer'));
  const body = encodeURIComponent(lines.join('\r\n'));
  window.location.href = 'mailto:toni@silkfutures.com?subject=' + subject + '&body=' + body;
});
