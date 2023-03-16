import React from 'react';
import SidebarPortal from '../../../../omelette/src/components/manage/Sidebar/SidebarPortal';
import DownloadData from './Data';
import View from './View';

const Edit = (props) => {
  const { data, onChangeBlock, block, selected } = props;

  return (
    <>
      <View {...props} />
      <SidebarPortal selected={selected}>
        <DownloadData
          key={block}
          {...props}
          data={data}
          block={block}
          onChangeBlock={onChangeBlock}
        />
      </SidebarPortal>
    </>
  );
};

export default Edit;
