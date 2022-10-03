import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { getPlans, postRegister } from "../axios";

function RegisterBeneficiaries() {
	const theme = createTheme();
  const history = useNavigate();
  const [disable, setDisable] = useState(true);
  const [name, setName] = useState('');
  const [age, setAge] = useState(0);
  const [plan, setPlan] = useState()
  const [plans, setPlans] = useState([])
  const [beneficiaries, setBeneficiaries] = useState([]);
  const [update, setUpdate] = useState(0);
  const [enableProposal, setEnableProposal] = useState(true);
  const [duplicated, setDuplicated] = useState(true);

  const enableButton = () => {
    if(name.length >= 3 && age >= 0) {
      setDisable(false);
    } else {
      setDisable(true);
    }
  }

  const enableButtonProposal = () => {
    if((beneficiaries.length > 0 && plan) && !duplicated) {
      setEnableProposal(false);
    } else {
      setEnableProposal(true);
    }
  }

  const addBeneficiary = () => {
    const array = beneficiaries;
    array.push({name, age})
    setBeneficiaries(array);
  }

  const removeBeneficiary = (id) => {
    const array = beneficiaries;
    array.splice(id, 1);
    setBeneficiaries(array);
  }

  const duplicatedNames = () => {
    const seen = new Set();
    const duplicated = beneficiaries.some(
      ({ name }) => seen.size === seen.add(name).size,
    );
    setDuplicated(duplicated);
  }

  const handleOnChangeName = ({target: { value }}) => {
    setName(value);
  }

  const handleOnChangeAge = ({target: { value }}) => {
    setAge(value);
  }

  const handleOnChangePlan = ({target: { value }}) => {
    setPlan(value);
  }

  const handleOnClick = () => {
    addBeneficiary();
    setUpdate(update + 1);
    duplicatedNames();
    setName('');
    setAge('');
  }

  const handleOnClickDelete = ({ target: { id } }) => {
    removeBeneficiary(id);
    duplicatedNames();
    setUpdate(update + 1);
  }

  const redirectListPage = async () => {
    await postRegister(beneficiaries, plan);
    history('/list-proposal');
  }

  const getSelectPlans = async () => {
    const result = await getPlans();
    setPlans(result);
    console.log(result);
  }

  useEffect(() => {
    enableButton();
    enableButtonProposal();
  }, [name, age, plan, update]);

  useEffect(() => {
  }, [beneficiaries]);

  useEffect(() => {
    getSelectPlans();
  }, [])

  return(
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          }}
        >
          <Typography component="h1" variant="h3">
            Nova Proposta
          </Typography>
          <Box component="form" noValidate sx={{ mt: 3 }}>
          <Typography component="h5" variant="h5" marginBottom={ 2 }>
            Cadastro Beneficiario
          </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                Nome Completo:
                <TextField
                  autoComplete="name"
                  name="name"
                  required
                  fullWidth
                  id="name"
                  label="Nome Completo"
                  autoFocus
                  value={name}
                  onChange={ handleOnChangeName }
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                Idade:
                <TextField
                  required
                  fullWidth
                  id="date"
                  name="date"
                  autoComplete="family-name"
                  type="number"
                  value={age}
                  onChange={ handleOnChangeAge }
                />
              </Grid>
            </Grid>
            <span>* Preencha os dois campos para habilitar o botão</span><br></br>
            <span>* Idade tem que ser igual/maior que 0</span>
            <Button
              fullWidth
              type="reset"
              disabled={disable}
              color="success"
              variant="contained"
              sx={{ mt: 1, mb: 2 }}
              onClick={ handleOnClick }
            >
              Cadastrar beneficiário
            </Button>
          </Box>
          <Typography component="h5" variant="h5">
            Selecione o Plano:
          </Typography>
          <FormControl sx={{mt: 2, mb: 2}} fullWidth>
            <InputLabel id="plan-select">Planos disponiveis</InputLabel>
            <Select
              labelId="plan-select"
              id="plan-select"
              value={plan}
              label="Plan"
              onChange={handleOnChangePlan}
            >
              {plans.map(({ nome, codigo }) => (
                <MenuItem value={codigo} >{nome}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <span>* Necessário ter um beneficiario cadastrado, não pode haver nomes duplicados e tem que ter um plano selecionado para habilitar o botão</span>
        </Box>
        <Button
          color="warning"
          fullWidth
          variant="contained"
          disabled={enableProposal}
          sx={{ mt: 1, mb: 2 }}
          onClick={ redirectListPage }
        >
        Gerar proposta
      </Button>
        <Typography component="h5" variant="h5" marginTop={5}>
          Beneficiarios Cadastrados
        </Typography>
        <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Nome</TableCell>
            <TableCell>Idade</TableCell>
            <TableCell>Idade</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {beneficiaries.map(({ name, age }, index) => (
            <TableRow key={name}>
              <TableCell>{name}</TableCell>
              <TableCell>{age}</TableCell>
              <TableCell>
                <Button
                  id={index}
                  variant="contained"
                  color="error"
                  sx={{ mt: 0, mb: 1 }}
                  onClick={ handleOnClickDelete }
                >
                  Deletar
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      </Container>
    </ThemeProvider>
  )
}

export default RegisterBeneficiaries;