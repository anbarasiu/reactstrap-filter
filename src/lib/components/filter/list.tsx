import classNames from 'classnames';
import React from 'react';
import { Input } from 'reactstrap';
import styles from './filters.module.scss';
import { IFilterConfig, IFilterConfigList } from './types';

interface IProps {
  item: IFilterConfig;
  setSelected: (arg1: string, arg2: boolean) => void;
  setValues: (arg1: string, arg2: string[]) => void;
}

const ListFilter = ({ item, setSelected, setValues }: IProps): JSX.Element => {
  const { selected, key, label, data } = item;
  const { values, options } = data as IFilterConfigList;

  const isValuePresent = (arr: Array<string>, value: string) =>
    arr.includes(value);

  return (
    <>
      <div className={classNames(styles.checkboxContainer)}>
        <Input
          type="checkbox"
          className={classNames(styles.checkbox)}
          checked={selected}
          onChange={(e) => {
            setSelected(key, e.currentTarget.checked);
          }}
        />
        <div className={classNames(styles.label)}>{label}</div>
      </div>
      {selected && (
        <div
          style={{
            padding: '12px 12px 12px 12px',
            backgroundColor: '#f7fafc',
          }}
        >
          {options.map((option) => {
            return (
              <div
                className={classNames(
                  styles.subOption,
                  'd-flex',
                  'align-items-center',
                  'pb-1',
                  'mb-2'
                )}
                key={option.value}
              >
                <Input
                  type="checkbox"
                  className={classNames(styles.checkbox)}
                  checked={isValuePresent(values, option.value)}
                  onChange={(e) => {
                    if (e.currentTarget.checked) {
                      setValues(key, values.concat(option.value));
                    } else {
                      const arr = [...values];
                      const index = arr.indexOf(option.value);
                      if (index !== -1) {
                        arr.splice(index, 1);
                      }
                      setValues(key, arr);
                    }
                  }}
                />
                <div className={classNames('pl-4')}>{option.name}</div>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
};
export default ListFilter;
