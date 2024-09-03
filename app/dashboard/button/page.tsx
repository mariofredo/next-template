import {Button} from '@/components';
export default function ButtonPage() {
  return (
    <div className='page_ctr'>
      <h1>Button Solid</h1>
      <div className='page_wrapper'>
        <Button
          bgColor='#0070f3'
          color='#fff'
          borderRadius='12px'
          padding='10px 20px'
          text='Submit'
        />
        <Button
          bgColor='#0070f3'
          color='#fff'
          borderRadius='12px'
          padding='10px 20px'
          text='Submit'
          disabled
        />
        <Button
          bgColor='#0070f3'
          color='#fff'
          borderRadius='12px'
          padding='10px 20px'
          text='Submit'
          disabled
          loading
        />
      </div>
      <h1>Button Outline</h1>
      <div className='page_wrapper'>
        <Button
          type='outline'
          bgColor='#fff'
          color='#0070f3'
          borderColor='#0070f3'
          borderRadius='12px'
          padding='10px 20px'
          text='Submit'
        />
        <Button
          type='outline'
          bgColor='#fff'
          color='#0070f3'
          borderColor='#0070f3'
          borderRadius='12px'
          padding='10px 20px'
          text='Submit'
          disabled
        />
        <Button
          type='outline'
          bgColor='#fff'
          color='#0070f3'
          borderColor='#0070f3'
          borderRadius='12px'
          padding='10px 20px'
          text='Submit'
          disabled
          loading
        />
      </div>
    </div>
  );
}
