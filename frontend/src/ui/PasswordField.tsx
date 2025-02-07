import {
  Box,
  PasswordInput,
  PasswordInputProps,
  Popover,
  Progress,
  Text,
} from '@mantine/core';
import { useState } from 'react';
import { HiCheck, HiXMark } from 'react-icons/hi2';
import { PASSWORD_REQUIREMENTS } from '../helpers/constants';

function PasswordRequirement({
  meets,
  label,
}: {
  meets: boolean;
  label: string;
}) {
  return (
    <Text
      c={meets ? 'teal' : 'red'}
      style={{ display: 'flex', alignItems: 'center' }}
      mt={7}
      size='sm'
    >
      {meets ? <HiCheck size={14} /> : <HiXMark size={14} />}
      <Box component='span' ml={10}>
        {label}
      </Box>
    </Text>
  );
}

function getStrength(password: string) {
  let multiplier = password.length > 5 ? 0 : 1;

  PASSWORD_REQUIREMENTS.forEach((requirement) => {
    if (!requirement.re.test(password)) {
      multiplier += 1;
    }
  });

  return Math.max(
    100 - (100 / (PASSWORD_REQUIREMENTS.length + 1)) * multiplier,
    10,
  );
}

/** Password input with a dropdown showcasing requirements */
export function PasswordField(props: PasswordInputProps) {
  const [popoverOpened, setPopoverOpened] = useState(false);
  const [value, setValue] = useState('');
  const checks = PASSWORD_REQUIREMENTS.map((requirement, index) => (
    <PasswordRequirement
      key={index}
      label={requirement.label}
      meets={requirement.re.test(value)}
    />
  ));

  const strength = getStrength(value);
  const color = strength === 100 ? 'teal' : strength > 50 ? 'yellow' : 'red';

  return (
    <Popover
      opened={popoverOpened}
      width='target'
      transitionProps={{ transition: 'pop' }}
    >
      <Popover.Target>
        <Box
          onFocusCapture={() => setPopoverOpened(true)}
          onBlurCapture={() => setPopoverOpened(false)}
        >
          <PasswordInput
            {...props}
            onChange={(event) => {
              setValue(event.currentTarget.value);
              props.onChange?.(event);
            }}
          />
        </Box>
      </Popover.Target>
      <Popover.Dropdown>
        <Progress color={color} value={strength} size={5} mb='xs' />
        {checks}
      </Popover.Dropdown>
    </Popover>
  );
}
