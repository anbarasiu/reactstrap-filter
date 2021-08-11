import { isPast } from 'date-fns';
import moment, { Moment } from 'moment';
import React, { Dispatch, SetStateAction } from 'react';
import ReactDatetime from 'react-datetime';
import 'react-datetime/css/react-datetime.css';
import {
  FormGroup,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
} from 'reactstrap';

interface IProps {
  initialValue?: string;
  setDate: Dispatch<SetStateAction<string | undefined>> | any;
  hasFuture?: boolean;
  isEndDate?: boolean;
}

const DatePicker = ({
  initialValue = '',
  setDate,
  hasFuture = false,
  isEndDate = false,
}: IProps): JSX.Element => {
  const inputProps = {
    placeholder: 'Date',
  };
  const isValidDate = (selected: Moment) => {
    if (hasFuture) return true;
    return isPast(selected.toDate());
  };

  return (
    <div style={{ minWidth: '120px' }}>
      <FormGroup className="mb-0">
        <InputGroup className="input-group-alternative">
          <InputGroupAddon addonType="prepend">
            <InputGroupText className="DatePickerCss">
              <i className="ni ni-calendar-grid-58" />
            </InputGroupText>
          </InputGroupAddon>
          <ReactDatetime
            utc
            isValidDate={isValidDate}
            defaultValue={initialValue}
            inputProps={inputProps}
            onChange={(e: Moment | string) => {
              if (e instanceof moment) {
                if (isEndDate) {
                  e = (e as Moment).add(1, 'days');
                }
                const dateString = moment((e as Moment).format()).toISOString();
                setDate(dateString);
              }
            }}
            timeFormat={false}
            closeOnSelect
            className="customPicker"
          />
        </InputGroup>
      </FormGroup>
    </div>
  );
};

export default DatePicker;
