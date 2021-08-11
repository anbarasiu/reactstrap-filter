import classNames from 'classnames';
import React from 'react';
import { Input } from 'reactstrap';
import styles from './filters.module.scss';
import { IFilterConfig, IFilterConfigNumber } from './types';

interface IProps {
  item: IFilterConfig;
  setSelected: (arg1: string, arg2: boolean) => void;
  setValue: (arg1: string, arg2: number, arg3: string) => void;
}

const StringFilter = ({ item, setSelected, setValue }: IProps): JSX.Element => {
  const { selected, key, label, data } = item;
  const { values } = data as IFilterConfigNumber;
  const value = values[0];
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
        />{' '}
        <div className={classNames(styles.label)}>{label}</div>
      </div>

      {selected && (
        <div
          style={{
            padding: '12px 12px 12px 8px',
            backgroundColor: '#f7fafc',
          }}
        >
          <div className={classNames()}>
            <Input
              className={classNames(styles.input, 'w-100', 'mb-2')}
              defaultValue={value}
              onChange={(e) => {
                setValue(key, 0, e.target.value);
              }}
            />
          </div>
        </div>
      )}
    </>
  );
};
export default StringFilter;
