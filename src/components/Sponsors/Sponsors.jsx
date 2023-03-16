import React, { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { Segment, List, Image } from 'semantic-ui-react';

import { keys, isEmpty } from 'lodash';

import { flattenToAppURL } from '@plone/volto/helpers';

import { searchContent } from '@plone/volto/actions';

const groupedSponsorsByLevel = (array = []) =>
  array.reduce((obj, item) => {
    let token = item.level?.token || 'bronze';
    obj[token] ? obj[token].push(item) : (obj[token] = [item]);
    return obj;
  }, {});

const Sponsors = () => {
  const dispatch = useDispatch();
  const content = useSelector((state) => state.workflow.transition);

  useEffect(() => {
    dispatch(
      searchContent(
        '/',
        {
          portal_type: ['News Item'],
          review_state: 'published',
          sort_on: 'effective',
        },
        'sponsors',
      ),
    );
  }, [dispatch, content]);

  const sponsors = useSelector((state) =>
    groupedSponsorsByLevel(state.search.subrequests.sponsors?.items),
  );

  return (
    <List>
      {keys(sponsors).map((level) => {
        return (
          <List.Item key={level} className={'sponsorlevel ' + level}>
            <h3>{level.toUpperCase()}</h3>
            <List horizontal>
              {sponsors[level].map((item) => (
                <List.Item key={item['@id']} className="sponsor">
                  {item.logo ? (
                    <Image
                      className="logo"
                      as="a"
                      href={item.url}
                      target="_blank"
                      src={flattenToAppURL(item.logo.scales.preview.download)}
                      size="small"
                      alt={item.title}
                      title={item.title}
                    />
                  ) : (
                    <a href={item['@id']}>{item.title}</a>
                  )}
                </List.Item>
              ))}
            </List>
          </List.Item>
        );
      })}
    </List>
  );
};

export default Sponsors;
