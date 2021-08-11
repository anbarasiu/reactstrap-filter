import classNames from 'classnames';
import React from 'react';
import {
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Input,
  UncontrolledButtonDropdown
} from 'reactstrap';
import styles from './filters.module.scss';
import { IFilterConfig, IFilterConfigNumber } from './types';

interface IProps {
  item: IFilterConfig;
  setSelected: (arg1: string, arg2: boolean) => void;
  setValue: (arg1: string, arg2: number, arg3: string) => void;
}

const NumberFilter = ({ item, setSelected, setValue }: IProps): JSX.Element => {
  const { selected, key, label, data } = item;
  const { values } = data as IFilterConfigNumber;
  const condition = values[0];
  const firstNumber = values[1];
  const secondNumber = values[2];
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
            padding: '12px 12px 12px 12px',
            backgroundColor: '#f7fafc',
          }}
        >
          <UncontrolledButtonDropdown
            className={classNames(styles.numberDropdown)}
          >
            <DropdownToggle
              caret
              className={classNames(
                styles.dropdownToggle,
                'd-flex',
                'justify-content-between'
              )}
            >
              {condition || 'equals'}
            </DropdownToggle>
            <DropdownMenu right>
              <DropdownItem
                onClick={() => {
                  setValue(key, 0, 'equals');
                  setValue(key, 2, '');
                }}
              >
                equals
              </DropdownItem>
              <DropdownItem
                onClick={() => {
                  setValue(key, 0, 'between');
                }}
              >
                between
              </DropdownItem>
              <DropdownItem
                onClick={() => {
                  setValue(key, 0, 'greater than');
                  setValue(key, 2, '');
                }}
              >
                greater than
              </DropdownItem>
              <DropdownItem
                onClick={() => {
                  setValue(key, 0, 'less than');
                  setValue(key, 2, '');
                }}
              >
                less than
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledButtonDropdown>

          <div className={classNames(styles.inputContainer, 'mt-2')}>
            <Input
              className={classNames(styles.input)}
              defaultValue={firstNumber}
              onChange={(e) => {
                setValue(key, 0, values[0]);
                setValue(key, 1, e.target.value);
              }}
            />
            {condition === 'between' && (
              <Input
                className={classNames(styles.input)}
                defaultValue={secondNumber}
                onChange={(e) => {
                  setValue(key, 0, values[0]);
                  setValue(key, 2, e.target.value);
                }}
              />
            )}
          </div>
        </div>
      )}
    </>
  );
};
export default NumberFilter;
