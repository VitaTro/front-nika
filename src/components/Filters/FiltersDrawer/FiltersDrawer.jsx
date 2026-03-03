import {
  CloseButton,
  Drawer,
  Input,
  Label,
  Select,
} from "./FiltersDrawer.styled";

const FiltersDrawer = ({ isOpen, onClose, category, filters, setFilters }) => {
  return (
    <Drawer className={`drawer ${isOpen ? "open" : ""}`}>
      <CloseButton className="close-btn" onClick={onClose}>
        ×
      </CloseButton>

      <h3>Фільтри</h3>

      {/* Earrings */}
      {category === "earrings" && (
        <>
          <Label>Тип застібки</Label>
          <Select
            value={filters.clasp}
            onChange={(e) => setFilters({ ...filters, clasp: e.target.value })}
          >
            <option value="">Всі</option>
            <option value="stud">Гвіздочки</option>
            <option value="hoop">Кільця</option>
            <option value="hook">Гачок</option>
          </Select>

          <Label>Колір каміння</Label>
          <Select
            value={filters.stoneColor}
            onChange={(e) =>
              setFilters({ ...filters, stoneColor: e.target.value })
            }
          >
            <option value="">Всі</option>
            <option value="white">Білий</option>
            <option value="red">Червоний</option>
            <option value="blue">Синій</option>
          </Select>
        </>
      )}

      {/* Chains */}
      {category === "chains" && (
        <>
          <Label>Довжина (см)</Label>
          <Input
            type="number"
            value={filters.length}
            onChange={(e) =>
              setFilters({ ...filters, length: Number(e.target.value) })
            }
          />
        </>
      )}

      {/* Bracelets */}
      {category === "bracelets" && (
        <>
          <Label>Довжина (см)</Label>
          <Input
            type="number"
            value={filters.length}
            onChange={(e) =>
              setFilters({ ...filters, length: Number(e.target.value) })
            }
          />

          <Label>Колір каміння</Label>
          <Select
            value={filters.stoneColor}
            onChange={(e) =>
              setFilters({ ...filters, stoneColor: e.target.value })
            }
          >
            <option value="">Всі</option>
            <option value="white">Білий</option>
            <option value="red">Червоний</option>
            <option value="blue">Синій</option>
          </Select>
        </>
      )}

      {/* Crosses */}
      {category === "crosses" && (
        <>
          <Label>З камінням?</Label>
          <Select
            value={filters.withStones}
            onChange={(e) =>
              setFilters({ ...filters, withStones: e.target.value })
            }
          >
            <option value="">Всі</option>
            <option value="yes">Так</option>
            <option value="no">Ні</option>
          </Select>
        </>
      )}

      {/* Pendants */}
      {category === "pendants" && (
        <>
          <Label>З камінням?</Label>
          <Select
            value={filters.withStones}
            onChange={(e) =>
              setFilters({ ...filters, withStones: e.target.value })
            }
          >
            <option value="">Всі</option>
            <option value="yes">Так</option>
            <option value="no">Ні</option>
          </Select>

          <Label>Літера</Label>
          <Input
            type="text"
            maxLength={1}
            value={filters.letter}
            onChange={(e) =>
              setFilters({ ...filters, letter: e.target.value.toUpperCase() })
            }
          />
        </>
      )}
    </Drawer>
  );
};

export default FiltersDrawer;
