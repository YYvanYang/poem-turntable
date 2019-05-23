import React, { useState } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Sunburst from 'components/Sunburst';
import ContainedButtons from 'components/ContainedButtons';
import LinearIndeterminate from 'components/LinearIndeterminate';
import Snackbar from 'components/Snackbar'
import { useInterval } from 'Hooks/useInterval';
import { getPoemById } from 'utils/utils';

function App() {
  const [delay, setDelay] = useState(null);
  const [duration, setDuration] = useState(null);
  const [count, setCount] = useState(1);
  const [open, setOpen] = useState(false);
  const [msg, setMsg] = useState({});

  useInterval(() => {
    if (delay !== null && count % 10 === 0) {
      setDelay(delay + 10);
    }

    if (delay >= 100) {
      setDuration(null);
    }
    setCount(count + 1);
  }, duration);

  function execute() {
    setOpen(false);
    setDelay(30);
    setDuration(500);
    setCount(1);
  }

  function stop(index) {
    setDelay(null);
    setDuration(null);
    const poem = getPoemById(String(index))
    // const author = `${poem.dynasty} ${poem.author}`
    // const message = `${poem.poem}(${author.trim()})`
    setMsg(poem)
    setOpen(true);
    // console.log('current index:', poem);
  }

  function close() {
    setOpen(false);
  }

  return (
    <>
      <CssBaseline />
      <Typography
        component="div"
        variant="body1"
        style={{ height: '100%', width: '100%', position: 'relative' }}
      >
        <Box
          position="absolute"
          top="50%"
          left="50%"
          css={{ transform: 'translate(-50%, -50%)' }}
          zIndex="modal"
        >
          <ContainedButtons execute={execute} />
        </Box>

        <Box
          color="primary.main"
          bgcolor="rgba(0,0,0,0.35)"
          position="absolute"
          top="0"
          left="0"
          width="100%"
          height="100%"
          zIndex="modal"
          display={delay ? '' : 'none'}
        >
          <LinearIndeterminate />
        </Box>

        <Container maxWidth="md">
          <Sunburst delay={delay} onStop={stop} />
        </Container>
      </Typography>
      <Snackbar open={open} msg={msg} onClose={close}/>
    </>
  );
}

export default App;
