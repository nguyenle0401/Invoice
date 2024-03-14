// InvoiceList.test.ts
import { expect } from 'chai';
import { shallow } from 'enzyme';
import React from 'react';
import InvoiceList from './InvoiceList';

describe('<InvoiceList />', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(<InvoiceList />);
    expect(wrapper.exists()).to.be.true;
  });

  it('renders no invoices available message when there are no invoices', () => {
    const wrapper = shallow(<InvoiceList />);
    expect(wrapper.text()).to.include('No invoices available.');
  });

  // Add more test cases as needed
});
