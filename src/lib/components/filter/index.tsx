import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import {
  Button,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledDropdown,
} from 'reactstrap';
import QUERY from '../../utils/query';
import STRING from '../../utils/string';
import DateFilter from './date';
import styles from './filters.module.scss';
import ListFilter from './list';
import NumberFilter from './number';
import StringFilter from './string';
import { EFilterConfigType, IFilterConfig } from './types';

interface IProps {
  config: IFilterConfig[];
  queryParams?: string; // TODO: Optional till full migration
}

const useQuery = (params: string) => {
  return new URLSearchParams(params);
};

const boxShadowStyle = {
  boxShadow: `rgb(0 0 0 / 0%) 0px 0px 0px 0px,
  rgb(0 0 0 / 0%) 0px 0px 0px 0px, 
  rgb(0 0 0 / 12%) 0px 1px 1px 0px, 
  rgb(60 66 87 / 16%) 0px 0px 0px 1px, 
  rgb(0 0 0 / 0%) 0px 0px 0px 0px, 
  rgb(0 0 0 / 0%) 0px 0px 0px 0px, 
  rgb(60 66 87 / 8%) 0px 2px 5px 0px`,
};

const Filter = ({ config, queryParams = '' }: IProps): JSX.Element => {
  const history = useHistory();

  const [numFilters, setNumFilters] = useState(0);
  const [items, setItems] = useState(config);

  const urlParams = useQuery(queryParams);

  const clearAll = () => {
    const cleared = items.map((item) => {
      item.selected = false;
      item.data.values = [];
      return item;
    });
    setItems(cleared);
  };

  const applyFilter = () => {
    const query: {
      [key: string]: string;
    } = {};
    items.forEach((item) => {
      const { key, data, selected, type } = item;
      if (selected && data.values.length > 0) {
        if (type === EFilterConfigType.number) {
          const condition = data.values.shift();
          query.condition = condition || '';
        }
        const queryString = STRING.joinWithoutTrailingDelimiter(data.values);
        query[key] = queryString;
      }
    });
    history.push(`${window.location.pathname}?${QUERY.build(query)}`);
  };

  const getAppliedFromQuery = (configuration: IFilterConfig[]) =>
    configuration.map((item) => {
      const values = urlParams.get(item.key);
      if (values) {
        if (item.type === EFilterConfigType.number) {
          const condition = urlParams.get('condition') || 'equals';
          item.data.values = [condition, ...values?.split(',')];
        } else {
          item.data.values = values?.split(',');
        }
        item.selected = true;
      }
      return item;
    });

  useEffect(() => {
    const prefilled = getAppliedFromQuery(config);
    setItems(prefilled);
  }, [config]);

  const setSelected = (key: string, value: boolean) => {
    const updatedItems = items.map((item) => {
      if (item.key === key) {
        item.selected = value;
      }
      return item;
    });
    setItems(updatedItems);
  };

  useEffect(() => {
    const numberSelected = items.reduce(
      (all, current) => (current.selected ? all + 1 : all),
      0
    );
    setNumFilters(numberSelected);
  }, [items]);

  /*
   *  Set single value in an array to generate comma-separated values
   */
  const setValue = (key: string, index: number, value: string) => {
    const updatedItems = items.map((item) => {
      if (item.key === key) {
        item.data.values[index] = value;
      }
      return item;
    });
    setItems(updatedItems);
  };

  /*
   *  Set entire array to generate comma-separated values
   */
  const setValues = (key: string, values: string[]) => {
    const updatedItems = items.map((item) => {
      if (item.key === key) {
        item.data.values = values;
      }
      return item;
    });
    setItems(updatedItems);
  };

  const getFilter = (item: IFilterConfig): JSX.Element => {
    switch (item.type) {
      case EFilterConfigType.date:
        return (
          <DateFilter
            setSelected={setSelected}
            item={item}
            setValue={setValue}
          />
        );
      case EFilterConfigType.number:
        return (
          <NumberFilter
            setSelected={setSelected}
            item={item}
            setValue={setValue}
          ></NumberFilter>
        );
      case EFilterConfigType.list:
        return (
          <ListFilter
            setSelected={setSelected}
            item={item}
            setValues={setValues}
          ></ListFilter>
        );
      case EFilterConfigType.string:
        return (
          <StringFilter
            setSelected={setSelected}
            item={item}
            setValue={setValue}
          ></StringFilter>
        );
      default:
        return <></>;
    }
  };

  return (
    <>
      <UncontrolledDropdown>
        <DropdownToggle
          caret
          style={boxShadowStyle}
          className={classNames(styles.dropdownToggle, 'customButton')}
        >
          {' '}
          <i className={classNames(styles.filterIcon, 'fas', 'fa-filter')} />
          Filter {numFilters > 0 ? `(${numFilters})` : <></>}
        </DropdownToggle>
        <DropdownMenu right style={{ paddingBottom: '0px', minWidth: '15rem' }}>
          <DropdownItem
            text
            style={{
              display: 'flex',
              padding: '8px 8px 8px 8px',
              justifyContent: 'space-around',
            }}
          >
            <Button
              style={boxShadowStyle}
              className={classNames(styles.button, 'btn-sm')}
              onClick={clearAll}
            >
              Clear
            </Button>
            <div className={classNames(styles.filtersHeading)}>Filters</div>
            <Button
              className={classNames(styles.applyFilterBtn, 'btn-sm')}
              onClick={applyFilter}
            >
              Done
            </Button>
          </DropdownItem>

          <DropdownItem divider className={classNames(styles.divider)} />
          {items.map((item, index) => (
            <>
              {index > 0 && (
                <DropdownItem divider className={classNames(styles.divider)} />
              )}
              {getFilter(item)}
            </>
          ))}
        </DropdownMenu>
      </UncontrolledDropdown>
    </>
  );
};

export default Filter;
