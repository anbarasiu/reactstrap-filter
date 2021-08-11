import classNames from 'classnames';
import DatePicker from '../calendar';
import React from 'react';
import { Input } from 'reactstrap';
import { formatDate } from '../../utils/date-format';
import { IFilterConfig, IFilterConfigDate } from './types';
import styles from './filters.module.scss';

interface IProps {
  item: IFilterConfig;
  setSelected: (arg1: string, arg2: boolean) => void;
  setValue: (arg1: string, arg2: number, arg3: string) => void;
}

const DateFilter = ({ item, setSelected, setValue }: IProps): JSX.Element => {
  const { selected, key, label, data } = item;
  const { values } = data as IFilterConfigDate;
  const dateFrom = values[0];
  const dateTo = values[1];
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
        <div className={classNames(styles.datepickerContainer)}>
          <div>
            <DatePicker
              initialValue={dateFrom ? formatDate(dateFrom) : ''}
              setDate={(val: string) => setValue(key, 0, val)}
            />
          </div>
          <small className="text-muted px-2">-</small>
          <div>
            <DatePicker
              initialValue={dateTo ? formatDate(dateTo) : ''}
              setDate={(val: string) => setValue(key, 1, val)}
              isEndDate
            />
          </div>
        </div>
      )}
    </>
  );
};
export default DateFilter;
