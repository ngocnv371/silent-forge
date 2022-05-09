// import mods from poedb
// ex: [https://poedb.tw/us/One_Hand_Swords#ModifiersCalc]
function getTags(headElement) {
  const tagNodes = headElement.querySelectorAll('[data-tag]');
  const list = [];
  tagNodes.forEach((n) => {
    list.push(n.textContent);
  });
  return list;
}

function getGroupName(table) {
  const captionNode = table.querySelector('caption');
  return captionNode.textContent.replace('ModGroup: ', '');
}

function getModDescription(node) {
  node.querySelectorAll('.float-right, .badge').forEach((e) => {
    e.remove();
  });
  node.innerHTML = node.innerHTML.replace('<br>', '\n');
  let text = node.textContent.trim();
  // replace number with #
  text = text.replace(/\d+([.]\d+)*/g, '#');
  text = text.replaceAll('(#–#)', '#');
  return text;
}

function validateModDescription(text) {
  return text && text.indexOf('#') >= 0;
}

function getTiers(table) {
  /**
   * convert to a number range.
   *
   * (123-345) => [123,456]
   *
   * +(1-2) => [1,2]
   *
   * +1 => [1]
   * @param {string} text raw text
   */
  function convertToRange(text) {
    return text.replace('+', '').replace('(', '').replace(')', '').split('-').filter(Number).map(Number);
  }
  const rows = table.querySelectorAll('tbody tr');
  const tiers = [];
  rows.forEach((row) => {
    const tier = {};
    tiers.push(tier);
    const cells = row.querySelectorAll('td');
    tier.name = cells[0].textContent;
    tier.level = Number(cells[1].textContent);
    tier.magnitudes = [];
    const modNodes = cells[2].querySelectorAll('.mod-value');
    modNodes.forEach((mod) => {
      const text = mod.textContent.replace('–', '-');
      const mag = convertToRange(text);
      tier.magnitudes.push(mag);
    });
    const weightNode = cells[2].querySelector('.badge-danger');
    tier.weight = Number(weightNode.textContent);
    tier.description = getModDescription(cells[2]);
  });
  return tiers;
}

function getAffixType(tiers) {
  if (tiers.some((t) => t.name.indexOf('of') >= 0)) {
    return 'Suffix';
  }
  return 'Prefix';
}

function getGroupWeight(headElement) {
  const node = headElement.querySelector('[data-tooltip="weight"]');
  return Number(node.textContent);
}

const normalMods = document.querySelectorAll('.identifynormal .mod-title');
const list = [];
normalMods.forEach((head) => {
  const group = {};
  const modalId = head.getAttribute('data-target');
  const table = document.querySelector(`${modalId} table.orig`);
  if (!table) {
    console.error(`modal not found: ${modalId}`);
    return;
  }
  group.weight = getGroupWeight(head);
  group.tags = getTags(head);
  group.tiers = getTiers(table);
  group.description = group.tiers[0].description;
  // remove 'description' from tier
  group.tiers = group.tiers.map((t) => {
    const { description, ...rest } = t;
    return rest;
  });
  if (!validateModDescription(group.description)) {
    return;
  }
  group.type = getAffixType(group.tiers);
  group.name = getGroupName(table);
  list.push(group);
});
console.log(list);
