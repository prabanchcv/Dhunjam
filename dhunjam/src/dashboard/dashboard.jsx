// Dashboard.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BarChart from '../barChart';

const Dashboard = () => {
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [chargeCustomers, setChargeCustomers] = useState(false);
  const [customSongAmount, setCustomSongAmount] = useState(100);
  const [regularSongAmounts, setRegularSongAmounts] = useState({
    category_7: 80,
    category_8: 60,
    category_9: 40,
    category_10: 20,
  });

  const [graphData, setGraphData] = useState({
    labels: ['Custom', 'Category 7', 'Category 8', 'Category 9', 'Category 10'],
    datasets: [
      {
        label: 'Amounts',
        data: [
          customSongAmount,
          regularSongAmounts.category_7,
          regularSongAmounts.category_8,
          regularSongAmounts.category_9,
          regularSongAmounts.category_10,
        ],
        backgroundColor: '#F0C3F1',
      },
    ],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://stg.dhunjam.in/account/admin/4');
        const { name, location, charge_customers, amount } = response.data.data;
        setName(name);
        setLocation(location);
        setChargeCustomers(charge_customers);
        setCustomSongAmount(amount.category_6);
        setRegularSongAmounts({
          category_7: amount.category_7,
          category_8: amount.category_8,
          category_9: amount.category_9,
          category_10: amount.category_10,
        });

        setGraphData({
          labels: ['Custom', 'Category 7', 'Category 8', 'Category 9', 'Category 10'],
          datasets: [
            {
              label: 'Amounts',
              data: [amount.category_6, amount.category_7, amount.category_8, amount.category_9, amount.category_10],
              backgroundColor: '#F0C3F1',
            },
          ],
        });
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleSave = async () => {
    try {
      const response = await axios.put('https://stg.dhunjam.in/account/admin/4', {
        amount: {
          category_6: customSongAmount,
          category_7: regularSongAmounts.category_7,
          category_8: regularSongAmounts.category_8,
          category_9: regularSongAmounts.category_9,
          category_10: regularSongAmounts.category_10,
        },
      });

      setGraphData({
        labels: ['Custom', 'Category 7', 'Category 8', 'Category 9', 'Category 10'],
        datasets: [
          {
            label: 'Amounts',
            data: [customSongAmount, regularSongAmounts.category_7, regularSongAmounts.category_8, regularSongAmounts.category_9, regularSongAmounts.category_10],
            backgroundColor: '#F0C3F1',
          },
        ],
      });

      console.log('Save successful:', response.data);
    } catch (error) {
      console.error('Save failed:', error);
    }
  };

  return (
    <div style={styles.back}>
      <div style={styles.container}>
        <h1 style={styles.heading}>{name}</h1>
        <p style={styles.location}>{location}</p>

        <div style={styles.question}>
          <p style={styles.questionText}>
            Do you want to charge your,<br /> customers for requesting songs?
          </p>
          <div style={styles.radioButtons}>
            <label>
              <input
                type="radio"
                value="yes"
                checked={chargeCustomers}
                onChange={() => setChargeCustomers(true)}
              />
              Yes
            </label>
            <label>
              <input
                type="radio"
                value="no"
                checked={!chargeCustomers}
                onChange={() => setChargeCustomers(false)}
              />
              No
            </label>
          </div>
        </div>

        {chargeCustomers && (
          <>
            <div style={styles.inputContainer}>
              <p>Custom Song Request Amount:</p>
              <input
                type="number"
                value={customSongAmount}
                onChange={(e) => setCustomSongAmount(e.target.value)}
                min="99"
                placeholder="Amount"
                style={styles.input}
              />
            </div>

            <div style={styles.inputContainer2}>
              <p>Regular Song Request Amounts <br />from high to low:</p>
              <div style={{ 'padding-left': '90px' }}></div>
              {Object.keys(regularSongAmounts).map((category, index) => (
                <div key={category} style={styles.inputContainer2Item}>
                  <input
                    type="number"
                    value={regularSongAmounts[category]}
                    onChange={(e) => setRegularSongAmounts({ ...regularSongAmounts, [category]: e.target.value })}
                    min={index + 79}
                    placeholder="Amount"
                    style={styles.input2}
                  />
                </div>
              ))}
            </div>
          </>
        )}

        {/* Graph */}
        <div style={styles.graphContainer}>
          {chargeCustomers && (
            <>
              <p>Graph:</p>
              <BarChart data={[
                customSongAmount,
                regularSongAmounts.category_7,
                regularSongAmounts.category_8,
                regularSongAmounts.category_9,
                regularSongAmounts.category_10,
              ]} />
            </>
          )}
        </div>

        {/* Save Button */}
        <button
          type="button"
          onClick={handleSave}
          style={{ ...styles.saveButton, opacity: chargeCustomers ? 1 : 0.5 }}
          disabled={!chargeCustomers}
        >
          Save
        </button>
      </div>
    </div>
  );
};

const styles = {
  back: {
    margin: '0',
    backgroundColor: '#030303',
    width: '59vh',
    paddingLeft: '66vh',
    height: '120vh',
  },
  container: {
    background: '#030303',
    color: '#FFFFFF',
    paddingLeft: '0px',
    width: '80vh',
    margin: '0 auto',
    fontFamily: 'Poppins',
  },
  heading: {
    fontSize: '32px',
    textAlign: 'center',
    maxWidth: '600px',
    margin: '0 auto',
  },
  location: {
    fontSize: '16px',
    textAlign: 'center',
    maxWidth: '600px',
    margin: '0 auto',
  },
  question: {
    marginTop: '20px',
    display: 'flex',
    justifyContent: 'space-between',
  },
  questionText: {
    fontSize: '16px',
    marginBottom: '10px',
  },
  radioButtons: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: '20px',
    marginTop: '40px',
    paddingRight: '90px',
  },
  inputContainer: {
    marginTop: '20px',
    display: 'flex',
    paddingRight: '55px',
  },
  inputContainer2: {
    marginTop: '0px',
    paddingRight: '60px',
    display: 'flex',
    justifyContent: 'space-around',
  },
  inputContainer2Item: {
    height: '55px',
    display: 'flex',
    flexDirection: 'column',
    marginTop: '10px',
  },
  input: {
    width: '30vh',
    height: '5vh',
    padding: '8px',
    marginTop: '12px',
    marginLeft: '120px',
    paddingLeft: '90px',
    border: `1px solid #FFFFFF`,
    borderRadius: '7px',
    boxSizing: 'border-box',
    color: '#FFFFFF',
    background: '#030303',
  },
  input2: {
    width: '50px',
    height: '5vh',
    padding: '8px',
    border: `1px solid #FFFFFF`,
    borderRadius: '4px',
    boxSizing: 'border-box',
    color: '#FFFFFF',
    background: '#030303',
  },
  graphContainer: {
    marginTop: '20px',
    maxWidth: '600px',
    margin: '0 auto',
  },
  saveButton: {
    background: '#6741D9',
    color: '#FFFFFF',
    padding: '10px',
    borderRadius: '4px',
    cursor: 'pointer',
    marginTop: '20px',
    width: '100%',
    border: '1px solid #F0C3F1',
    transition: 'border 0.3s ease-in-out',
    maxWidth: '600px',
    margin: '0 auto',
  },
};

export default Dashboard;
