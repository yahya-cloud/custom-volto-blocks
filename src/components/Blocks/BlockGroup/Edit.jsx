import React, { useState, useEffect } from 'react';
import BlocksForm from '../../../../omelette/src/components/manage/Blocks/Block/BlocksForm';
import EditBlockWrapper from '../../../../omelette/src/components/manage/Blocks/Block/EditBlockWrapper';
import { emptyBlocksForm } from '../../../../omelette/src/helpers/Blocks/Blocks';
import View from './View';
import config from '@plone/volto/registry';
import { isEmpty, without } from 'lodash';

const styles = {
  backgroundColor: '#ccc',
  height: 200,
};

const Edit = (props) => {
  const {
    block,
    data,
    onChangeBlock,
    pathname,
    selected,
    manage,
    onAddBlock,
  } = props;

  const metadata = props.metadata || props.properties;
  const [selectedBlock, setSelectedBlock] = useState(false);
  const [multiSelected, setMultiSelected] = useState([]);

  function onSelectBlock(id) {
    setSelectedBlock(id);
  }

  function onSelectBlock(id, activeBlock, isMultipleSelection, event) {
    let newMultiSelected = [];
    let selected = id;

    if (isMultipleSelection) {
      selected = null;

      const blocks_layout = data.data.blocks_layout;

      if (event.shiftKey) {
        const anchor =
          multiSelected.length > 0
            ? blocks_layout.indexOf(multiSelected[0])
            : blocks_layout.indexOf(activeBlock);
        const focus = blocks_layout.indexOf(id);

        if (anchor === focus) {
          newMultiSelected = [id];
        } else if (focus > anchor) {
          newMultiSelected = [...blocks_layout.slice(anchor, focus + 1)];
        } else {
          newMultiSelected = [...blocks_layout.slice(focus, anchor + 1)];
        }
      }

      if ((event.ctrlKey || event.metaKey) && !event.shiftKey) {
        if (multiSelected.includes(id)) {
          selected = null;
          newMultiSelected = without(multiSelected, id);
        } else {
          newMultiSelected = [...(multiSelected || []), id];
        }
      }
    }

    setMultiSelected(newMultiSelected);
    setSelectedBlock(selected);
  }

  function handleKeyDown(
    e,
    index,
    block,
    node,
    {
      disableEnter = false,
      disableArrowUp = false,
      disableArrowDown = false,
    } = {},
  ) {
    if (e.key === 'ArrowUp' && !disableArrowUp) {
      props.onFocusPreviousBlock(block, node);
      e.preventDefault();
    }
    if (e.key === 'ArrowDown' && !disableArrowDown) {
      props.onFocusNextBlock(block, node);
      e.preventDefault();
    }
    if (e.key === 'Enter' && !disableEnter) {
      onAddBlock(config.settings.defaultBlockType, index + 1);
      e.preventDefault();
    }
  }

  useEffect(() => {
    onChangeBlock(block, {
      ...data,
      data: { ...emptyBlocksForm() },
    });
  }, []);

  return (
    <div
      role="presentation"
      onKeyDown={(e) => {
        handleKeyDown(e, props.index, props.block, props.blockNode.current);
      }}
      style={styles}
    >
      {data.data && (
        <BlocksForm
          id={'textGroup'}
          key={'textGroup'}
          title={'Text Group form'}
          description={'This text group description'}
          manage={manage}
          allowedBlocks={data?.allowedBlocks}
          metadata={metadata}
          properties={{
            ...metadata,
            ...(isEmpty(data.data) ? emptyBlocksForm() : data.data),
          }}
          disableEvents={false}
          // selectedBlock={selected ? this.state.colSelections[colId] : null}
          selectedBlock={selected ? selectedBlock : null}
          onSelectBlock={(id, selected, e) => {
            const isMultipleSelection = e
              ? e.shiftKey || e.ctrlKey || e.metaKey
              : false;
            onSelectBlock(
              id,
              selectedBlock,
              selectedBlock === id ? false : isMultipleSelection,
              e,
            );
          }}
          onChangeFormData={(newFormData) => {
            onChangeBlock(block, {
              ...data,
              data: {
                blocks: newFormData.blocks,
                blocks_layout: newFormData.blocks_layout,
              },
            });
          }}
          onChangeField={(id, value) => {
            console.log(id, value);
          }}
          pathname={pathname}
        >
          {({ draginfo }, editBlock, blockProps) => (
            <EditBlockWrapper draginfo={draginfo} blockProps={blockProps}>
              {editBlock}
            </EditBlockWrapper>
          )}
        </BlocksForm>
      )}
    </div>
  );
};

export default Edit;
