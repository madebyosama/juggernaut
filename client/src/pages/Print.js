import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Moment from 'react-moment';
import moment from 'moment';
import ReactToPrint from 'react-to-print';
import './Print.css';

const Print = ({ closePrintModal, selectedLoad, printType }) => {
  const componentRef = useRef();

  const type = printType;
  const id = selectedLoad._id;

  const [load, setLoad] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch = async () => {
      setLoading(true);
      const res = await axios.get(`/loads/${id}`);

      const data = res.data.data;
      setLoad({
        id: data.id,
        origin_address_line1: data.origin.address.line1,
        origin_address_line2: data.origin.address.line2,
        origin_address_city: data.origin.address.city,
        origin_address_province: data.origin.address.province,
        origin_date_and_time: data.origin.date_and_time,
        destination_address_line1: data.destination.address.line1,
        destination_address_line2: data.destination.address.line2,
        destination_address_city: data.destination.address.city,
        destination_address_province: data.destination.address.province,
        destination_date_and_time: data.destination.date_and_time,
        consignor_name: data.consignor.name,
        consignor_phone: data.consignor.phone,
        consignee_name: data.consignee.name,
        consignee_phone: data.consignee.phone,
        details_distance: data.details.distance,
        details_trailer_type: data.details.trailer_type,
        details_trailer_axle: data.details.trailer_axle,
        details_full_or_partial: data.details.full_or_partial,
        details_capacity_value: data.details.capacity.value,
        details_capacity_unit: data.details.capacity.unit,
        details_quantity: data.details.quantity,
        details_weight_value: data.details.weight.value,
        details_weight_unit: data.details.weight.unit,
        details_volume_value: data.details.volume.value,
        details_volume_unit: data.details.volume.unit,
        details_commodity_description: data.details.commodity_description,
        details_quantity_description: data.details.quantity_description,
        details_notes: data.details.notes,
        business_id: data.business_id,
        carrier_id: data.carrier_id,
        amount: data.amount,
        driver_name: data.driver_name,
        vehicle_registeration_number: data.vehicle_registeration_number,
      });
      setLoading(false);
    };
    fetch();
  }, []);

  if (loading && load === {}) {
    return <div>Loading...</div>;
  }

  if (type === 'Dispatch' || 'Invoice') {
    return (
      <div className='modal-background flex flex-item bg-pending modal-animation'>
        <div
          className='modal-container mx-144 text-left modal-container-animation modal-container-scroll absolute'
          style={{ backgroundColor: 'none', width: '900px' }}
        >
          <div className='flex column p-64 '>
            <div className='flex space-between'>
              <ReactToPrint
                trigger={() => (
                  <button className='primary-button'>Print </button>
                )}
                content={() => componentRef.current}
              />
              <button
                onClick={() => closePrintModal(false)}
                className='secondary-button'
              >
                Close
              </button>
            </div>
            <div ref={componentRef} className='print-page '>
              <div className='align-center'>
                <div className='print-header pb-48'>
                  <div className='print-logo'>
                    <img
                      src='https://i.imgur.com/dTq4GCd.png'
                      id='print-logo'
                    />
                  </div>
                  <div className='print-head'>
                    <div className='print-title'>{type} Document</div>
                    <div className='flex full-width'>
                      <div className='print-borders small-bold-title full-width px-16 py-8 text-center'>
                        Load Number
                      </div>
                      <div className='print-borders small-bold-title full-width  px-8 py-8 nml-2 text-center'>
                        {load.id}
                      </div>
                    </div>
                    <div className='flex space-between '>
                      <div className='flex column p-16'>
                        <div className='small-title pb-4'>Business Id</div>
                        <div className='small-bold-title'>
                          {load.business_id}
                        </div>
                      </div>
                      <div className='flex column p-16'>
                        <div className='small-title pb-4'>Support</div>
                        <div className='small-bold-title'>+92 302 8283 999</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='flex space-between pb-24'>
                  <div className='pickup-details full-width px-24'>
                    <div className='center'>
                      <h2>Pickup Address</h2>
                      <h4>{load.consignor_name}</h4>
                      <p>
                        <b>Phone: </b> {load.consignor_phone}
                      </p>
                      <p className='h64'>
                        {load.origin_address_line1}, {load.origin_address_line2}
                        , {load.origin_address_city},{' '}
                        {load.origin_address_province}
                      </p>

                      <p className='bold uppercase black-bg text-center full-width white py-4'>
                        <Moment format='ddd D/M'>
                          {load.origin_date_and_time}
                        </Moment>
                        <span className='mr-4'></span>
                        {
                          <Moment format='HH:mm'>
                            {load.origin_date_and_time}
                          </Moment>
                        }
                        <span> - </span>
                        {
                          <Moment
                            format='HH:mm'
                            add={(10, 'minutes')}
                            date={moment(load.origin_date_and_time).add(
                              2,
                              'hours'
                            )}
                          />
                        }
                        &nbsp;HRS
                      </p>
                    </div>
                  </div>
                  <div className='delivery-details full-width px-24  nml-2'>
                    <div className='center'>
                      <h2>Delivery Address</h2>
                      <h4>{load.consignee_name}</h4>
                      <p>
                        <b>Phone: </b> {load.consignee_phone}
                      </p>
                      <p className='h64'>
                        {load.destination_address_line1},{' '}
                        {load.destination_address_line2},{' '}
                        {load.destination_address_city},{' '}
                        {load.destination_address_province}
                      </p>

                      <p className='bold uppercase black-bg text-center full-width white py-4'>
                        <Moment format='ddd D/M'>
                          {load.destination_date_and_time}
                        </Moment>
                        <span className='mr-4'></span>
                        {
                          <Moment format='HH:mm'>
                            {load.destination_date_and_time}
                          </Moment>
                        }
                        <span> - </span>
                        {
                          <Moment
                            format='HH:mm'
                            add={(10, 'minutes')}
                            date={moment(load.destination_date_and_time).add(
                              2,
                              'hours'
                            )}
                          />
                        }
                        &nbsp;HRS
                      </p>
                    </div>
                  </div>
                </div>
                <div className='print-description flex column full-width mt-8 '>
                  <div className='white black-bg bold py-8 pl-8 z-index-1'>
                    Description of Load
                  </div>
                  <div className='flex full-width'>
                    <div className='flex column br-grey-2 full-width nmt-2'>
                      <div className='small-bold-title-grey py-4 px-8 br-b-grey-2 h14'>
                        Trailer Type
                      </div>
                      <div className='small-bold-title-grey py-4 px-8 br-b-grey-2 h14'>
                        Trailer Axles
                      </div>
                      <div className='small-bold-title-grey py-4 px-8 br-b-grey-2 h14'>
                        Full or Partial
                      </div>
                      <div className='small-bold-title-grey py-4 px-8 br-b-grey-2 h14'>
                        Weight
                      </div>
                      <div className='small-bold-title-grey py-4 px-8 br-b-grey-2 h14'>
                        Volume
                      </div>
                      <div className='small-bold-title-grey py-4 px-8 br-b-grey-2 h14'>
                        Quantity
                      </div>
                      <div className='small-bold-title-grey py-4 px-8 br-b-grey-2 h14'>
                        Capacity
                      </div>
                      <div className='small-bold-title-grey py-4 px-8 br-b-grey-2 h14'>
                        Commodity Description
                      </div>
                      <div className='small-bold-title-grey py-4 px-8 br-b-grey-2 h14'>
                        Quantity Description
                      </div>
                      <div className='small-bold-title-grey py-4 px-8'>
                        Comments
                      </div>
                    </div>
                    <div className='flex column br-grey-2 nml-2 full-width nmt-2'>
                      <div className='small-bold-title py-4 px-8 br-b-grey-2 h14'>
                        {load.details_trailer_type}
                      </div>
                      <div className='small-bold-title py-4 px-8 br-b-grey-2 h14'>
                        {load.details_trailer_axle}
                      </div>
                      <div className='small-bold-title py-4 px-8 br-b-grey-2 h14'>
                        {load.details_full_or_partial}
                      </div>
                      <div className='small-bold-title py-4 px-8 br-b-grey-2 h14'>
                        {load.details_weight_value} KGS
                      </div>
                      <div className='small-bold-title py-4 px-8 br-b-grey-2 h14'>
                        {load.details_volume_value} M<sup>3</sup>
                      </div>
                      <div className='small-bold-title py-4 px-8 br-b-grey-2 h14'>
                        {load.details_quantity}
                      </div>
                      <div className='small-bold-title py-4 px-8 br-b-grey-2 h14'>
                        {load.details_capacity_value}{' '}
                        {load.details_capacity_unit}
                      </div>
                      <div className='small-bold-title py-4 px-8 br-b-grey-2 h14'>
                        {load.details_commodity_description}
                      </div>
                      <div className='small-bold-title py-4 px-8 br-b-grey-2 h14'>
                        {load.details_quantity_description}
                      </div>
                      <div className='small-bold-title py-4 px-8'>
                        {load.details_notes}
                      </div>
                    </div>
                  </div>
                  {type === 'Dispatch' ? (
                    <div>
                      <div className='flex py-16 space-between'>
                        <div className='full-width pr-16'>
                          <div className='bold'>Consignor's Remarks</div>
                          <div className='pt-32 br-b-grey-1 full-width'></div>
                          <div className='pt-32 br-b-grey-1 full-width'></div>
                        </div>
                        <div className='full-width pl-16'>
                          <div className='bold'>Consignee's Remarks</div>
                          <div className='pt-32 br-b-grey-1 full-width'></div>
                          <div className='pt-32 br-b-grey-1 full-width'></div>
                        </div>
                      </div>
                      <div className='flex pb-16'>
                        <div className='flex full-width pr-16 column'>
                          <div className='flex'>
                            <div className='bold'>Signatures:</div>
                            <div className='pt-8 br-b-grey-1 full-width'></div>
                          </div>
                          <div className='flex'>
                            <div className='bold'>Date:</div>
                            <div className='pt-8 br-b-grey-1 full-width'></div>
                          </div>
                        </div>
                        <div className='flex full-width pl-16 column'>
                          <div className='flex'>
                            <div className='bold'>Signatures:</div>
                            <div className='pt-8 br-b-grey-1 full-width'></div>
                          </div>
                          <div className='flex'>
                            <div className='bold'>Date:</div>
                            <div className='pt-8 br-b-grey-1 full-width'></div>
                          </div>
                        </div>
                      </div>
                      <div className='flex pt-24 br-t-black-2'>
                        <div className='flex full-width pr-16 column flex-three'>
                          <div className='flex'>
                            <div className='bold'>Driver's Sign:</div>
                            <div className='pt-8 br-b-grey-1 width-40'></div>
                          </div>
                          <div className='flex'>
                            <div className='bold pt-4'>Date:</div>
                            <div className='pt-8 br-b-grey-1 full-width'></div>
                          </div>
                        </div>
                        <div className='flex full-width pl-16 column flex-two'>
                          <div className='flex '>
                            <div className=''>Driver's Name:&nbsp;</div>
                            <div className='bold'>{load.driver_name}</div>
                          </div>
                          <div className='flex pt-4'>
                            <div className=''>Vehicle Registeration:&nbsp;</div>
                            <div className='bold'>
                              {load.vehicle_registeration_number}
                            </div>
                          </div>
                        </div>
                        <div className='flex full-width pl-16 column flex-one'>
                          <div className='flex '>
                            <div className=''>Carrier ID: </div>
                            <div className='pt-8'></div>
                          </div>
                          <div className='flex '>
                            <div className='pt-4 bold'>{load.carrier_id}</div>
                            <div className='pt-8'></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <div
                        className='flex mt-32 pt-32 pb-24 space-between'
                        style={{ borderTop: '1px dotted black' }}
                      >
                        <div className='full-width pr-16'>
                          <div className='bold'>Remarks</div>
                          <div className='pt-32 br-b-grey-1 full-width'></div>
                          <div className='pt-32 br-b-grey-1 full-width'></div>
                        </div>
                        <div className='full-width pl-16'>
                          <div className='flex space-between pb-8 flex-one'>
                            <div className='dark-grey uppercase bold flex-two'>
                              Subtotal
                            </div>
                            <div className='pr-16'>:</div>
                            <div className='uppercase bold flex-one text-right'>
                              {(load.amount * 1)
                                .toString()
                                .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}{' '}
                              PKR
                            </div>
                          </div>
                          <div className='flex space-between pb-8 flex-one'>
                            <div className='dark-grey bold flex-two'>
                              Service Charges @ 10%
                            </div>
                            <div className='pr-16'>:</div>
                            <div className='uppercase bold flex-one text-right'>
                              {((load.amount * 10) / 100)
                                .toString()
                                .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}{' '}
                              PKR
                            </div>
                          </div>
                          <div className='flex space-between pb-8 br-b-grey-1 flex-one'>
                            <div className='dark-grey bold flex-two'>
                              Sales Taxes @ 3%
                            </div>
                            <div className='pr-16'>:</div>
                            <div className='uppercase bold flex-one text-right'>
                              {((load.amount * 3) / 100)
                                .toString()
                                .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}{' '}
                              PKR
                            </div>
                          </div>
                          <div className='flex space-between pb-8 pt-8 flex-one'>
                            <div className='dark-grey uppercase bold flex-two'>
                              Grand Total
                            </div>
                            <div className='pr-16'>:</div>
                            <div className='uppercase bold flex-one text-right'>
                              {(
                                (load.amount * 5) / 100 +
                                (load.amount * 5) / 100 +
                                load.amount
                              )
                                .toString()
                                .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}{' '}
                              PKR
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className='flex pt-24 br-t-black-2'>
                        <div className='flex full-width pl-16 column flex-one text-center'>
                          <div className='flex '>
                            <div className=''>
                              Carrier ID: <b>{load.carrier_id}</b>
                            </div>
                            <div className='pt-8'></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default Print;
