import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getRegisters } from "../axios";
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

function ListProposal() {
  const history = useNavigate();
  const [list, setList] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [chosenPlan, setChosenPlan] = useState('');
  const [quantity, setQuantity] = useState(0);

  const getRegistersList = async () => {
    const registers = await getRegisters();
    setList(registers.beneficiaries);
    setTotalPrice(registers.totalPrice);
    setChosenPlan(registers.chosenPlan);
    setQuantity(registers.quantity);
  }

  useEffect(() => {
    getRegistersList();
  }, [])

  useEffect(() => {
  }, [list]);

  return(
    <React.Fragment>
      <h1>PROPOSTA</h1>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Nome</TableCell>
            <TableCell>Idade</TableCell>
            <TableCell>Preço individual</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {list.map(({beneficiary, age, price }) => (
            <TableRow key={beneficiary}>
              <TableCell>{beneficiary}</TableCell>
              <TableCell>{age}</TableCell>
              <TableCell>{`R$${price.toFixed(2)}`}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Table sx={{ mt: 3}}>
        <TableBody>
          <TableRow>
            <th>Preço Total: </th>
            <tb>{`R$${totalPrice.toFixed(2)}`}</tb>
          </TableRow>
          <TableRow>
            <th>Plano Escolhido: </th>
            <tb>{chosenPlan}</tb>
          </TableRow>
          <TableRow>
            <th>Quantidade Beneficiários: </th>
            <tb>{`${quantity} pessoas`}</tb>
          </TableRow>
        </TableBody>
      </Table>
      <Button
        variant="contained"
        color="success"
        sx={{ mt: 3, mb: 1}}
        onClick={ () => history('/register-beneficiaries') }
      >
        Voltar pagina de registro proposta
      </Button>
    </React.Fragment>
  )
}

export default ListProposal;