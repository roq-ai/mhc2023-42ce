import AppLayout from 'layout/app-layout';
import React, { useState } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  NumberInputStepper,
  NumberDecrementStepper,
  NumberInputField,
  NumberIncrementStepper,
  NumberInput,
  Center,
} from '@chakra-ui/react';
import * as yup from 'yup';
import DatePicker from 'react-datepicker';
import { FiEdit3 } from 'react-icons/fi';
import { useFormik, FormikHelpers } from 'formik';
import { getMatchById, updateMatchById } from 'apiSdk/matches';
import { Error } from 'components/error';
import { matchValidationSchema } from 'validationSchema/matches';
import { MatchInterface } from 'interfaces/match';
import useSWR from 'swr';
import { useRouter } from 'next/router';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { AccessOperationEnum, AccessServiceEnum, withAuthorization } from '@roq/nextjs';
import { TeamInterface } from 'interfaces/team';
import { TournamentInterface } from 'interfaces/tournament';
import { UserInterface } from 'interfaces/user';
import { getTeams } from 'apiSdk/teams';
import { getTournaments } from 'apiSdk/tournaments';
import { getUsers } from 'apiSdk/users';

function MatchEditPage() {
  const router = useRouter();
  const id = router.query.id as string;
  const { data, error, isLoading, mutate } = useSWR<MatchInterface>(
    () => (id ? `/matches/${id}` : null),
    () => getMatchById(id),
  );
  const [formError, setFormError] = useState(null);

  const handleSubmit = async (values: MatchInterface, { resetForm }: FormikHelpers<any>) => {
    setFormError(null);
    try {
      const updated = await updateMatchById(id, values);
      mutate(updated);
      resetForm();
      router.push('/matches');
    } catch (error) {
      setFormError(error);
    }
  };

  const formik = useFormik<MatchInterface>({
    initialValues: data,
    validationSchema: matchValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout>
      <Box bg="white" p={4} rounded="md" shadow="md">
        <Box mb={4}>
          <Text as="h1" fontSize="2xl" fontWeight="bold">
            Edit Match
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        {formError && (
          <Box mb={4}>
            <Error error={formError} />
          </Box>
        )}
        {isLoading || (!formik.values && !error) ? (
          <Center>
            <Spinner />
          </Center>
        ) : (
          <form onSubmit={formik.handleSubmit}>
            <FormControl id="score_a" mb="4" isInvalid={!!formik.errors?.score_a}>
              <FormLabel>Score A</FormLabel>
              <NumberInput
                name="score_a"
                value={formik.values?.score_a}
                onChange={(valueString, valueNumber) =>
                  formik.setFieldValue('score_a', Number.isNaN(valueNumber) ? 0 : valueNumber)
                }
              >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
              {formik.errors.score_a && <FormErrorMessage>{formik.errors?.score_a}</FormErrorMessage>}
            </FormControl>
            <FormControl id="score_b" mb="4" isInvalid={!!formik.errors?.score_b}>
              <FormLabel>Score B</FormLabel>
              <NumberInput
                name="score_b"
                value={formik.values?.score_b}
                onChange={(valueString, valueNumber) =>
                  formik.setFieldValue('score_b', Number.isNaN(valueNumber) ? 0 : valueNumber)
                }
              >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
              {formik.errors.score_b && <FormErrorMessage>{formik.errors?.score_b}</FormErrorMessage>}
            </FormControl>
            <AsyncSelect<TeamInterface>
              formik={formik}
              name={'team_a_id'}
              label={'Select Team'}
              placeholder={'Select Team'}
              fetcher={getTeams}
              renderOption={(record) => (
                <option key={record.id} value={record.id}>
                  {record?.name}
                </option>
              )}
            />
            <AsyncSelect<TeamInterface>
              formik={formik}
              name={'team_b_id'}
              label={'Select Team'}
              placeholder={'Select Team'}
              fetcher={getTeams}
              renderOption={(record) => (
                <option key={record.id} value={record.id}>
                  {record?.name}
                </option>
              )}
            />
            <AsyncSelect<TournamentInterface>
              formik={formik}
              name={'tournament_id'}
              label={'Select Tournament'}
              placeholder={'Select Tournament'}
              fetcher={getTournaments}
              renderOption={(record) => (
                <option key={record.id} value={record.id}>
                  {record?.name}
                </option>
              )}
            />
            <AsyncSelect<UserInterface>
              formik={formik}
              name={'scorekeeper_id'}
              label={'Select User'}
              placeholder={'Select User'}
              fetcher={getUsers}
              renderOption={(record) => (
                <option key={record.id} value={record.id}>
                  {record?.email}
                </option>
              )}
            />
            <Button isDisabled={formik?.isSubmitting} colorScheme="blue" type="submit" mr="4">
              Submit
            </Button>
          </form>
        )}
      </Box>
    </AppLayout>
  );
}

export default withAuthorization({
  service: AccessServiceEnum.PROJECT,
  entity: 'match',
  operation: AccessOperationEnum.UPDATE,
})(MatchEditPage);
