/**
 * Add your config changes here.
 * @module config
 * @example
 * export default function applyConfig(config) {
 *   config.settings = {
 *     ...config.settings,
 *     port: 4300,
 *     listBlockTypes: {
 *       ...config.settings.listBlockTypes,
 *       'my-list-item',
 *    }
 * }
 */

// All your imports required for the config here BEFORE this line
import '@plone/volto/config';
import {
  HighlightBlockView,
  HighlightBlockEdit,
  DownloadBlockView,
  DownloadBlockEdit,
  BlockGroupView,
  BlockGroupEdit,
} from '@package/components';
import heroSVG from '@plone/volto/icons/hero.svg';
import downSVG from '@plone/volto/icons/down.svg';

export default function applyConfig(config) {
  // Add here your project's configuration here by modifying `config` accordingly
  config.blocks.blocksConfig.highlight = {
    id: 'highlight',
    title: 'Highlight',
    icon: heroSVG,
    group: 'common',
    view: HighlightBlockView,
    edit: HighlightBlockEdit,
    restricted: false,
    mostUsed: true,
    sidebarTab: 1,
  };

  config.blocks.blocksConfig.download = {
    id: 'download',
    title: 'Download',
    icon: downSVG,
    group: 'common',
    view: DownloadBlockView,
    edit: DownloadBlockEdit,
    restricted: false,
    mostUsed: true,
    sidebarTab: 1,
  };

  config.blocks.blocksConfig.blockGroup = {
    id: 'blockGroup',
    title: 'Block Group',
    icon: heroSVG,
    group: 'common',
    view: BlockGroupView,
    edit: BlockGroupEdit,
    restricted: false,
    mostUsed: true,
    sidebarTab: 1,
  };

  return config;
}
