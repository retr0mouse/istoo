import { Combobox, Transition } from '@headlessui/react';
import { CheckIcon, ChevronUpDownIcon, MapPinIcon } from '@heroicons/react/20/solid';
import { Fragment, useEffect, useState } from 'react';

type City = {
  id: number,
  title: string
};

const cities = [
  { id: 1, title: 'Tallinn' },
  { id: 2, title: 'Tartu' },
  { id: 3, title: 'Narva' },
  { id: 4, title: 'Pärnu' },
  { id: 5, title: 'Paide' },
] as City[];

export default function CitiesCombobox({selectedCity, onSelected}) {
  const [selected, setSelected] = useState(cities[0])
  const [query, setQuery] = useState('')

  useEffect(() => {
      onSelected(selected);
  }, [selected])

  useEffect(() => {
    if (selectedCity) {
      setSelected(selectedCity);
    }
  }, [selectedCity]);

  const filteredCities =
    query === ''
      ? cities
      : cities.filter((city) =>
        city.title
          .toLowerCase()
          .replace(/\s+/g, '')
          .includes(query.toLowerCase().replace(/\s+/g, ''))
      )

  return (
    <Combobox value={selected} onChange={(city) => setSelected(city)}>
      <div className="relative w-56 h-12">
        <div className="cursor-pointer flex h-full items-center relative rounded-lg bg-white text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
          <MapPinIcon className="h-12 w-24 p-2 text-gray-600" />
          <div className="flex flex-col font-mono pl-3 pr-10 text-sm leading-5 text-gray-900">
            <Combobox.Label className="font-mono font-semibold text-button-green">City: </Combobox.Label>
            <Combobox.Input
              className="outline-none w-full"
              displayValue={(city: City) => city.title}
              onChange={(event) => setQuery(event.target.value)}
            />
          </div>

          <Combobox.Button className="flex items-center h-12 w-12 border-solid border-black">
            <ChevronUpDownIcon
              className="h-10 w-10 p-2 text-gray-600 border-solid border-black"
            />
          </Combobox.Button>
        </div>
        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
          afterLeave={() => setQuery('')}
        >
          <Combobox.Options className="font-mono absolute max-h-60 w-full rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
            {filteredCities.length === 0 && query !== '' ? (
              <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                Nothing found.
              </div>
            ) : (
              filteredCities.map((city) => (
                <Combobox.Option
                  key={city.id}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-10 pr-4 ${active ? 'bg-teal-600 text-white' : 'text-gray-900'
                    }`
                  }
                  value={city}
                >
                  {({ selected, active }) => (
                    <>
                      <span
                        className={`block truncate ${selected ? 'font-medium' : 'font-normal'
                          }`}
                      >
                        {city.title}
                      </span>
                      {selected ? (
                        <span
                          className={`absolute inset-y-0 left-0 flex items-center pl-3 ${active ? 'text-white' : 'text-teal-600'
                            }`}
                        >
                          <CheckIcon className="h-5 w-5" aria-hidden="true" />
                        </span>
                      ) : null}
                    </>
                  )}
                </Combobox.Option>
              ))
            )}
          </Combobox.Options>
        </Transition>
      </div>
    </Combobox >
  )
}
