import { FormControl, FormLabel, FormErrorMessage, Grid, Input, Select } from '@chakra-ui/react'
import React, {useState} from "react";
import MaskedInput from "react-input-mask"
import {useForm, Controller} from "react-hook-form";


function AccountSettings() {

const isMounted = React.useRef(false)


const [selectedCity, setSelectedCity] = useState('baku')
const [selectedCountry, setSelectedCountry] = useState('azerbaijan')
const [errorMessageMail, setErrorMassageMail] = useState('')
const [errorMessageMob, setErrorMassageMob] = useState('')


React.useEffect(()=> {
  if (isMounted.current) {
    const json = JSON.stringify({selectedCity, selectedCountry})
    localStorage.setItem('selected', json)
  } isMounted.current = true
}, [selectedCity, selectedCountry])

  

  const handleInputChangeMail = (e) => setErrorMassageMail(e.target.value)
  const handleInputChangeMob = (e) => setErrorMassageMob(e.target.value)


  const selectCityOption = [
    {
      value: 'baku',
      name: 'Baku'
    },
    {
      value: 'massali',
      name: 'Massali'
    },
    {
      value: 'lerik',
      name: 'Lerik'
    },
    {
      value: 'lenkoran',
      name: 'Lenkoran'
    }
  ]

  const selectCountryOption = [
    {
      value: 'azerbaijan',
      name:'Azerbaijan'
    },
    {
      value: 'turkey',
      name:'Turkey'
    },
    {
      value: 'america',
      name:'America'
    }
  ]


  const lsSelect = JSON.parse(localStorage.getItem('selected'))
  const { control } = useForm();
  const isErrorMail = errorMessageMail === ''
  const isErrorMob = errorMessageMob === ''
  return (
    <Grid
      templateColumns={{ base: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)' }}
      gap={6}
    >
      <FormControl id="firstName">
        <FormLabel>First Name</FormLabel>
        <Input focusBorderColor="brand.blue" type="text" placeholder="Nidzhat" />
      </FormControl>
      <FormControl id="lastName">
        <FormLabel>Last Name</FormLabel>
        <Input focusBorderColor="brand.blue" type="text" placeholder="Cafarov" />
      </FormControl>
      <FormControl id="phoneNumber" value={errorMessageMob} onChange={handleInputChangeMob} isInvalid={isErrorMob}>
        <FormLabel>Phone Number</FormLabel>
        {/*<Input*/}
        {/*  focusBorderColor="brand.blue"*/}
        {/*  type="tel"*/}
        {/*  mask="999.999.99.99"*/}
        {/*  placeholder="+994 (**) ***–**-**"*/}
        {/*/>*/}
        <Controller
            name="phone"
            control={control}
            defaultValue="+994"
            rules={{
              required: true,
            }}
            render={({ field }) => (
                <MaskedInput
                    className="chakra-input css-4ams3v"
                    mask={`+999 (99) 999-99-99`}
                    maskChar=""
                    value={`${field.value}`}
                    onChange={field.onChange}
                >
                  {(inputProps) => (
                      <input
                          {...inputProps}
                          type="text"
                      />
                  )}
                </MaskedInput>
            )}
        />

        <FormErrorMessage>Number is required.</FormErrorMessage>
      </FormControl>

      <FormControl id="emailAddress" value={errorMessageMail} onChange={handleInputChangeMail}  isInvalid={isErrorMail}>
        <FormLabel>Email Address</FormLabel>
        <Input
          focusBorderColor="brand.blue"
          type="email"
          placeholder="example.@mail.com"
        />
        <FormErrorMessage>Email is required.</FormErrorMessage>
      </FormControl>
      <FormControl id="city">
        <FormLabel>City</FormLabel>
        <Select focusBorderColor="brand.blue" placeholder="Select city" onClick={(eventCity) => setSelectedCity(eventCity.target.value)}>
          {
            selectCityOption.map(value => {
              return <option value={value.value}
                             selected={value.value === lsSelect.selectedCity}>
                {value.name}
              </option>
            })
          }
        </Select>
      </FormControl>
      <FormControl id="country">
        <FormLabel>Country</FormLabel>
        <Select focusBorderColor="brand.blue" placeholder="Select country" onClick = {(eventCountry)=> {setSelectedCountry(eventCountry.target.value)}}>
          {
            selectCountryOption.map(value => {
                return <option value={value.value}
                               selected={value.value === lsSelect.selectedCountry}>
                  {value.name}
                </option>
            })
          }
        </Select>
      </FormControl>
    </Grid>
  )
}

export default AccountSettings
