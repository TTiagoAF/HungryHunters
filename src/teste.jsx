import "./css/teste.css"

const Example = () => {
  return (
    <div className="container">
	<div className="header">
		<div className="title">Menu</div>
	</div>
	<div className="indicators">
		<div id="i1">
			<div className="navi-indicator" id="ni1"></div>
		</div>
		<div id="i2">
			<div className="navi-indicator" id="ni2"></div>
		</div>
		<div id="i3">
			<div className="navi-indicator" id="ni3"></div>
		</div>
		<div id="i4">
			<div className="navi-indicator" id="ni4"></div>
		</div>
	</div>
	<div className="navi">
		<div className="navi-item1">
			<button className="nav-button" id="startersbutton">
				<div className="navi-text">Entradas</div>
			</button>
		</div>
		<div className="navi-item2">
			<button className="nav-button" id="mainsbutton">
				<div className="navi-text">Pratos principais</div>
			</button>
		</div>
		<div className="navi-item3">
			<button className="nav-button" id="dessertsbutton">
				<div className="navi-text">Sobremesas</div>
			</button>
		</div>
		<div className="navi-item4">
			<button className="nav-button" id="drinksbutton">
				<div className="navi-text">Bebidas</div>
			</button>
		</div>
	</div>
	<div className="menu">
		<div className="menu-separator">Separador</div>
		<div className="menu-item">
			<div className="menu-item-name">Bife</div>
			<div className="menu-item-description">Bife de vaca</div>
			<div className="menu-item-price">9.50</div>
		</div>
		<div className="menu-separator">Separador</div>
		<div className="drink-item">
			<div className="drink-item-name">Água</div>
			<div className="drink-item-description">1L</div>
			<div className="drink-item-price">0.90</div>
		</div>
	</div>
</div>
  )
}
export default Example;